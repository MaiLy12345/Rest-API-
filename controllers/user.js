'use strict';
const ObjectId = require('mongodb').ObjectID
const fs = require('fs');
const path = require('path');
const Response = require('../helpers/response');

const filePath = path.resolve('./', 'database', 'users.json');

exports.getUserList = async (req, res, next) => {
    try {
        let users = await req.db.collection('users').find().toArray();
        if (!users) {
            return next(new Error('No data'));
        }
        return res.status(200).json({
            message: 'List',
            data: users
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message: 'Error! An error occurred.',
            Error: e
        });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const db = req.db; 
        const collection = db.collection('users');
        console.log(collection)
        const user = await collection.findOne({_id: ObjectId(_id)});
        if (!user) {
            return next(new Error('User not found'));
        }
        return res.status(200).json({
            message: 'Data User',
            data: user
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message: 'Error! An error occurred. Please try again later',
            Error: e
        });
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
        }, function (err, result) {
            if (err) {
                return next(err);
            }
            return Response.success(res, result);

        });

    } catch (e) {
        return next(e);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const db = req.db; 
        const collection = db.collection('users');
        console.log(collection)
        const user = await collection.findOne({_id: ObjectId(_id)});
        if (!user) {
            return next(new Error('user not found !'));
        }
        const deleted = await collection.deleteOne({_id: ObjectId(_id)});
        if (deleted.n === 0) {
            return next(new Error('Can not delete !'));
        }
//tra ve 1 object
        return res.status(200).json({
            message: 'delete user successful',
            data: user
        });
// 1 la xoa ok, con 0 la kjhong xoa dc
    } catch (e) {
        return next(e);
    }
};