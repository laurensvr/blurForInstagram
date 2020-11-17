const inputFolder = './input/';
const outputFolder = './output/';

var Jimp = require('jimp');
const fs = require('fs');
/*
Square Photo	1:1	1080 x 1080px
Landscape Photo	1.91:1	1080 x 608px
Portrait Photo	4:5	1080 x 1350px
*/
const instagramWidth = 1080;
const instagramHeight = 1350;

fs.readdirSync(inputFolder).forEach(file => {
    console.log(file);

    var blur = Jimp.read(inputFolder + file)
    .then(lenna => {
        return lenna
        .cover(instagramWidth, instagramHeight) // resize
        .blur(15)
    })
    .catch(err => {
        console.error(err);
    });

    var overlay = Jimp.read(inputFolder + file)
    .then(lenna => {
        return lenna
        .scaleToFit(instagramWidth, instagramHeight) // resize

    })
    .catch(err => {
        console.error(err);
    });

    var jimps = [blur, overlay];

    Promise.all(jimps).then(function(data) {
        return Promise.all(jimps);
    }).then(function(data){
        console.log("Image 1:" + data[1].bitmap.width);
        console.log("Image 0:" + data[0].bitmap.width);
        var offset = Math.round((data[0].bitmap.width - data[1].bitmap.width)/2);
        data[0].composite(data[1],offset,0)
        .quality(100) // set JPEG quality
        .write(outputFolder + 'Instagram_' + file); // save
    }).catch(err => {
        console.error(err);
    });


});
