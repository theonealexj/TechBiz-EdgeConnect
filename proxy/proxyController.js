const express = require("express");

const optimizeImage = require("./ImageOptimizer");
const optimizeVideo = require("./VideoOptimizer");

const fs = require("fs");

const path = require("path");




const router = express.Router();

router.get("/proxy", async (req, res) => {

    const url = req.query.url;

    const quality = Number(req.query.quality);

    const resolution = Number(req.query.resolution);

    try {

        // VIDEO FILE
        if (url.includes(".mp4")) {
            // Need to download the video if it's remote, but for simplicity, let's assume it's downloaded by the frontend or we can use axios to fetch it to a temp file
            // Let's implement download to temp file
            const axios = require("axios");
            let inputPath = url;
            let isTemp = false;

            if (url.startsWith("http")) {
                const response = await axios({
                    url: url,
                    responseType: "stream"
                });
                const crypto = require("crypto");
                const uniqueId = crypto.randomUUID();
                inputPath = path.join(__dirname, `temp_video_${uniqueId}.mp4`);
                const writer = fs.createWriteStream(inputPath);
                response.data.pipe(writer);
                await new Promise((resolve, reject) => {
                    writer.on('close', resolve);
                    writer.on('error', reject);
                });
                isTemp = true;
            }

            try {
                const optimizedPath = await optimizeVideo(inputPath, resolution || 360);
                res.setHeader("Content-Type", "video/mp4");
                const stream = fs.createReadStream(optimizedPath);
                stream.pipe(res);
                stream.on("end", () => {
                    // clean up
                    if (isTemp && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                    if (fs.existsSync(optimizedPath)) fs.unlinkSync(optimizedPath);
                });
                return;
            } catch (err) {
                console.error("Video optimization failed:", err);
                if (isTemp && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                return res.status(500).send("Video optimization failed");
            }
        }

        // ONLINE IMAGE

        if (url.includes(".jpg") || url.includes(".png")) {

            const optimizedImage = await optimizeImage(url, quality || 60);

            res.setHeader("Content-Type", "image/jpeg");

            return res.send(optimizedImage);

        }

        res.send("Unsupported file");

    }

    catch (error) {

        res.send(error.toString());

    }

});
module.exports = router;