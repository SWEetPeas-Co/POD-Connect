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

//for display members
userRoutes.route('/users/by-ids').get(async (req, res) => {
  try {
    const db = database.getDb();

    const uids = (req.query.uids || "")
      .split(",")
      .map(u => u.trim())
      .filter(u => u); // removes null/empty

    console.log("UIDs received:", uids); 

    if (uids.length === 0) {
      return res.json([]);
    }

    const users = await db.collection('users')
      .find(
        { firebaseUid: { $in: uids } },
        { projection: { firebaseUid: 1, name: 1, profileImage: 1, _id: 0 } }
      )
      .toArray();

    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
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
        name: request.body.name,
        profileImage: request.body.profileImage
    };

    let data = await db.collection('users').insertOne(mongoObject);
    response.json(data);
});

// 4 - Update One
userRoutes.route('/users/:firebaseUid').put(async (request, response) => {
    try {
        let db = database.getDb();
        
        // This spreads only the fields you send in the request body
        let updateData = { $set: request.body };

        let data = await db.collection('users').updateOne(
            { firebaseUid: request.params.firebaseUid },
            updateData
        );
        
        console.log(`Update successful for UID: ${request.params.firebaseUid}`);
        response.json(data);
    } catch (err) {
        console.error("Update error:", err);
        response.status(500).json({ error: err.message });
    }
});

// 5 - Delete One User + Clean Up Clubs
userRoutes.route('/users/:firebaseUid').delete(async (request, response) => {
    let db = database.getDb();
    const uid = request.params.firebaseUid;

    // 1. Delete the user
    await db.collection('users').deleteOne({ firebaseUid: uid });

    // 2. Find all clubs where this user is an admin
    const clubs = await db.collection('clubs').find({ admins: uid }).toArray();

    for (const club of clubs) {
        // If user is the ONLY admin → delete the club
        if (club.admins.length === 1) {
            await db.collection('clubs').deleteOne({ _id: club._id });
        } else {
            // Otherwise remove them from admins
            await db.collection('clubs').updateOne(
                { _id: club._id },
                { $pull: { admins: uid } }
            );
        }
    }

    // 3. Remove user from ALL members arrays
    await db.collection('clubs').updateMany(
        { members: uid },
        { $pull: { members: uid } }
    );

    // 4. Remove user from all club admins arrays
    await db.collection('clubs').updateMany(
    { admins: uid },
    { $pull: { admins: uid } }
    );

    // 5. 
    await db.collection('clubs').deleteMany(
        { admins: { $size: 0 } }
    );
    // 5. Remove user from all event attendees arrays
    await db.collection('events').updateMany(
    { attendees: uid },
    { $pull: { attendees: uid } }
    );
    // 6. Recalculate headcount for all events
    await db.collection('events').updateMany(
    {},
    [
        { $set: { headcount: { $size: "$attendees" } } }
    ]
    );

   

    response.json({ message: "User deleted and club data cleaned up." });
});

module.exports = userRoutes;