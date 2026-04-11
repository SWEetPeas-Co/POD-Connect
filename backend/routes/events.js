const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;

let eventRoutes = express.Router();

// 1 - Retrieve All
eventRoutes.route('/events').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('events').find({}).toArray();
    if (data.length > 0) {
        data = data.map(item => ({ ...item, _id: item._id.toString() }));
        response.json(data);
    } else {
        throw new Error("No events found");
    }
});

// 2 - Retrieve One
eventRoutes.route('/events/:id').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('events').findOne({_id: new ObjectId(request.params.id)});
    if (Object.keys(data).length > 0) {
        response.json(data);
    } else {
        throw new Error("No events found");
    }
});

// 3 - Create One
eventRoutes.route('/events').post(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        id: request.body.id,
        title: request.body.title,
        clubId: request.body.clubId,
        location: request.body.location,
        time: request.body.time,
        description: request.body.description,
        tags: request.body.tags,
        headcount: request.body.headcount,
    }
    let data = await db.collection('events').insertOne(mongoObject);
    response.json(data);
});

// 4 - Update One
eventRoutes.route('/events/:id').put(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
            id: request.body.id,
            title: request.body.title,
            clubId: request.body.clubId,
            location: request.body.location,
            time: request.body.time,
            description: request.body.description,
            tags: request.body.tags,
            headcount: request.body.headcount,
        }
    }
    let data = await db.collection('events').updateOne({_id: new ObjectId(request.params.id)}, mongoObject);
    response.json(data);
});

// 5 - Delete One
eventRoutes.route('/events/:id').delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('events').deleteOne({_id: new ObjectId(request.params.id)});
    response.json(data);
});

module.exports = eventRoutes;