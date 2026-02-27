const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
ffmpeg.setFfmpegPath(ffmpegPath);

const fs = require("fs");

const path = require("path");

async function optimizeVideo(inputPath, resolution) {

    return new Promise((resolve, reject) => {

        if (!fs.existsSync(inputPath)) {

            return reject("File not found");

        }

        const crypto = require("crypto");
        const uniqueId = crypto.randomUUID();
        const outputPath = path.join(
            path.dirname(inputPath),
            "optimized_" + resolution + "_" + uniqueId + ".mp4"
        );


        let size;


        if (resolution == 360) size = "640x360";

        else if (resolution == 480) size = "854x480";

        else if (resolution == 720) size = "1280x720";

        else size = "640x360";


        ffmpeg(inputPath)

            .size(size)

            .output(outputPath)

            .on("end", () => {

                resolve(outputPath);

            })

            .on("error", (err, stdout, stderr) => {
                console.error("FFmpeg Error:", err.message);
                console.error("FFmpeg stderr:", stderr);
                reject(err);
            })

            .run();

    });

}

module.exports = optimizeVideo;