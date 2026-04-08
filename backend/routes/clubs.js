const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;

let clubRoutes = express.Router();

// 1 - Retrieve All Clubs
clubRoutes.route('/clubs').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('clubs').find({}).toArray();
    if (data.length > 0) {
        response.json(data);
    } else {
        throw new Error("No clubs found");
    }
});

// 2 - Retrieve One Club
clubRoutes.route('/clubs/:id').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('clubs').findOne({_id: new ObjectId(request.params.id)});
    if (Object.keys(data).length > 0) {
        response.json(data);
    } else {
        throw new Error("No clubs found");
    }
});

// 3 - Create One Club
clubRoutes.route('/clubs').post(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        id: request.body.id,
        club: request.body.club,
        tags: request.body.tags,
        headcount: request.body.headcount,
        description: request.body.description,
        image: request.body.image,
        admins: request.body.admin || [],
        members: request.body.members || []
    }
    let data = await db.collection('clubs').insertOne(mongoObject);
    response.json(data);
});

// 4 - Update One Club
clubRoutes.route('/clubs/:id').put(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
            id: request.body.id,
            club: request.body.club,
            tags: request.body.tags,
            headcount: request.body.headcount,
            description: request.body.description,
            image: request.body.image, 
            admins: request.body.admin || [],
            members: request.body.members || []
        }
    }
    let data = await db.collection('clubs').updateOne({_id: new ObjectId(request.params.id)}, mongoObject);
    response.json(data);
});

// 5 - Delete One Club
clubRoutes.route('/clubs/:id').delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('clubs').deleteOne({_id: new ObjectId(request.params.id)});
    response.json(data);
});

module.exports = clubRoutes;