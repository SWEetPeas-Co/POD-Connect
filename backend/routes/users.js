const express = require('express');
const database = require('../connect');

let userRoutes = express.Router();

//testing route
userRoutes.get("/test-db", async (req, res) => {
  try {
    const db = database.getDb();
    const result = await db.command({ ping: 1 });
    res.json({ connected: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false, error: err.message });
  }
});

// 1 - Retrieve All
userRoutes.route('/users').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('users').find({}).toArray();
    if (data.length > 0) {
        response.json(data);
    } else {
        throw new Error("No users found");
    }
});

// 2 - Retrieve One
userRoutes.route('/users/:firebaseUid').get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('users').findOne({ firebaseUid: request.params.firebaseUid });
    if (data) {
        response.json(data);
    } else {
        throw new Error("User not found");
    }
});

// 3 - Create One
userRoutes.route('/users').post(async (request, response) => {
    let db = database.getDb();

    let existing = await db.collection('users').findOne({ firebaseUid: request.body.firebaseUid });
    if (existing) {
        return response.status(200).json({ message: "User already exists" });
    }

    let mongoObject = {
        firebaseUid: request.body.firebaseUid,
        email: request.body.email,
        createdAt: request.body.createdAt,
        name: request.body.name
    };

    let data = await db.collection('users').insertOne(mongoObject);
    response.json(data);
});

// 4 - Update One
userRoutes.route('/users/:firebaseUid').put(async (request, response) => {
    let db = database.getDb();
    let mongoObject = {
        $set: {
            email: request.body.email,
            name: request.body.name
        }
    };
    let data = await db.collection('users').updateOne(
        { firebaseUid: request.params.firebaseUid },
        mongoObject
    );
    response.json(data);
});

// 5 - Delete One
userRoutes.route('/users/:firebaseUid').delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection('users').deleteOne({ firebaseUid: request.params.firebaseUid });
    response.json(data);
});

module.exports = userRoutes;