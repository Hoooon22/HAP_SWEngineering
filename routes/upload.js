const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// model loading
var models = require('../models');

let storage_material = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/material/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});
let storage_dataroom = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/dataroom/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});


// 1. 미들웨어 등록
let upload_material = multer({
    storage: storage_material
});
let upload_dataroom = multer({
    storage: storage_dataroom
});

// 2. 파일 업로드 처리
router.post('/material/create', upload_material.single("imgFile"), function(req, res, next) {
    // 3. 파일 객체
    let file = req.file
    let body = req.body

    // 4. 파일 정보
    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    let post = models.material.create({
        name: body.name,
        maxNum: body.maxNum,
        num: body.maxNum,
    })
    .then( post => {
        res.redirect("../../material");
    })
    .catch( err => {
      console.log(err)
    })

    
});

module.exports = router;