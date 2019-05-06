'use strict';

const fs = require('fs');
const path = require('path');
const Response = require('../helpers/response');

const filePath = path.resolve('./', 'database', 'users.json');

exports.getUserList = (req, res, next) => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(req.db);//test middlewarw global
        if (Array.isArray(fileData) && fileData.length > 0) {
            return Response.success(res, fileData);
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.getUserById = (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = fileData.findIndex((user) => {
            return parseInt(user.id) === userId
        });

        if (index < 0) {
            return next(new Error('USER_NOT_FOUND'))
        }

        return Response.success(res, fileData[index]);
    } catch (e) {
        return next(e);
    }
};

exports.createUser = (req, res, next) => {
    try {
        const { username, password } = req.body;
        const db = req.db;
        const collection = db.collection('users');
        collection.insert({
            username,
            password
        }, function(err, result) {
            if (err) {
                return next(err);
            }
            return Response.success(res, result);
            
        });
    
        // let userId = 1;
        // const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // const index = fileData.findIndex((user) => {
        //     return user.username === username
        // });

        // if (index >= 0) {
        //     return next(new Error('USERNAME_ALREADY_EXIST'))
        // }

        // userId = fileData[fileData.length - 1].id + 1;

        // fileData.push({
        //     id: userId,
        //     username,
        //     password
        // });

        // fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        // return Response.success(res, { id: userId });
    } catch (e) {
        return next(e);
    }
};

exports.deleteUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const db = req.db;
        const collection = db.collection('users');
        // const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // const index = fileData.findIndex((user) => {
        //     return parseInt(user.id) === userId
        // });

        // if (index < 0) {
        //     return next(new Error('USER_NOT_FOUND'));
        // }

        // fileData.splice(index, 1);
        // fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};