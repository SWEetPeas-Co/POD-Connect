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
        data = data.map(item => ({ ...item, _id: item._id.toString() }));
        response.json(data);
    } else {
        throw new Error("No clubs found");
    }
});

// 3 - Create One Club
clubRoutes.route('/clubs').post(async (request, response) => {
    let db = database.getDb();
    const userId = request.body.userId; // the creator's Firebase UID

    if (!userId) {
        return response.status(400).json({ error: "userId is required to create a club" });
    }

    let mongoObject = {
        club: request.body.club,
        tags: request.body.tags || [],
        description: request.body.description,
        image: request.body.image,
        admins: [userId],     // creator becomes admin
        members: [userId],    // creator becomes member
        headcount: 1          // because 1 member
    };

    let data = await db.collection('clubs').insertOne(mongoObject);
    response.json(data);
});

// 4 - Update One Club
clubRoutes.route('/clubs/:id').put(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
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
    const clubId = request.params.id;

    // 1. Delete the club
    await db.collection('clubs').deleteOne({ _id: new ObjectId(clubId) });

    // 2. Delete all events that belong to this club
    await db.collection('events').deleteMany({ clubId: clubId });

    response.json({ message: "Club and related events deleted." });
});
//6 - Join a Club
clubRoutes.route('/clubs/:id/join').post(async (req, res) => {
  const db = database.getDb();
  const userId = req.body.userId;

  const updated = await db.collection('clubs').findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $addToSet: { members: userId } },
    { returnDocument: "after" }
  );

  // Recalculate headcount
  await db.collection('clubs').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { headcount: updated.members.length } }
  );

  res.json(updated);
});
//7 - Leave a Club
clubRoutes.route('/clubs/:id/leave').post(async (req, res) => {
  const db = database.getDb();
  const userId = req.body.userId;

  const updated = await db.collection('clubs').findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $pull: { members: userId } },
    { returnDocument: "after" }
  );

  await db.collection('clubs').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { headcount: updated.members.length } }
  );

  res.json(updated);
});


module.exports = clubRoutes;