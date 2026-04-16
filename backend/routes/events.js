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
        tags: request.body.tags || [],
        attendees: [],          
        headcount: 0            // headcount is automatically set to 0 when event is created
    };

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
        }
    }
    let data = await db.collection('events').updateOne({_id: new ObjectId(request.params.id)}, mongoObject);
    response.json(data);
});
// Join Event
eventRoutes.route('/events/:id/join').post(async (req, res) => {
    const db = database.getDb();
    const userId = req.body.userId;

    const updated = await db.collection('events').findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        {
            $addToSet: { attendees: userId },
            $set: { updatedAt: new Date() }
        },
        { returnDocument: "after" }
    );

    // Recalculate headcount
    await db.collection('events').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { headcount: updated.attendees.length } }
    );

    res.json(updated);
});
// Leave Event
eventRoutes.route('/events/:id/leave').post(async (req, res) => {
    const db = database.getDb();
    const userId = req.body.userId;

    const updated = await db.collection('events').findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        {
            $pull: { attendees: userId },
            $set: { updatedAt: new Date() }
        },
        { returnDocument: "after" }
    );

    await db.collection('events').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { headcount: updated.attendees.length } }
    );

    res.json(updated);
});


// 5 - Delete One
eventRoutes.route('/events/:id').delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('events').deleteOne({_id: new ObjectId(request.params.id)});
    response.json(data);
});

module.exports = eventRoutes;