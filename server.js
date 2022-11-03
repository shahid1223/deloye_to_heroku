const express = require('express');
const app = express();
const path = require("path")
const cors = require('cors');
require('dotenv').config();
const Port = process.env.PORT || 3000;
const connectToMongo = require('./config/db');

connectToMongo();

app.use(express.json({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api/user', require('./routes/auth/user'));
app.use('/api/file', require('./routes/file_upload/fileUpload'));
app.use('/api/post', require('./routes/post/post'));
app.use('/api/activity', require('./routes/FollowAndUnfollow/FollowAndUnfollow'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(Port, () => {
    console.log(`practice app running at http://${process.env.HOST}${Port}`);
})