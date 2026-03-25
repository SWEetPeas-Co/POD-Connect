const connect = require('./connect');
const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const clubRoutes = require('./routes/clubs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', eventRoutes);
app.use('/', clubRoutes);

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`Server is running on port ${PORT}`);
});