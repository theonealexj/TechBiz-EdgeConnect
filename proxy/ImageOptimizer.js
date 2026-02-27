const sharp = require("sharp");
const axios = require("axios");

async function optimizeImage(url, quality) {

    const response = await axios({
        url: url,
        responseType: "arraybuffer"
    });

    const compressed = await sharp(response.data)
        .jpeg({ quality: quality })
        .toBuffer();

    return compressed;
}

module.exports = optimizeImage;