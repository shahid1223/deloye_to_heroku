const express = require('express');
const router = express.Router();
const upload = require('../../middleware/fileUpload');
const Image = require('../../models/Image');
const { v4: uuid4 } = require('uuid');
require('dotenv').config();


router.post('/uploadphoto', async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (!req.file) {
                return res.status(400).json({ error: "File is required", code: 400 });
            };
            if (err) {
                return res.status(500).json({ error: err.message, code: 500 });
            };

            const image = new Image({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
            });

            const response = await image.save();
            return res.status(200).json({ file: `http://${process.env.HOST}${process.env.PORT}/api/file/${response.uuid}` })

        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error", code: 500 });
    }
});

router.get('/:uuid', async (req, res) => {
    try {
        const image = await Image.findOne({ uuid: req.params.uuid });

        if (!image) {
            return res.status(404).json({ error: "Image not found", code: 404 });
        };

        const imageLink = `${__dirname}/../../${image.path}`;
        res.download(imageLink)
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/show/:uuid', async (req, res) => {
    try {
        const image = await Image.findOne({ uuid: req.params.uuid });

        if (!image) {
            return res.status(404).json({ error: "Image not found", code: 404 });
        };

        const imageDownloadLink = `http://${process.env.HOST}${process.env.PORT}/api/file/${image.uuid}`;
        res.send(imageDownloadLink)
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router
