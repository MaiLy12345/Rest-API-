'use strict';

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
        const id = req.params.id;
        const userId = parseInt(id);
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });
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
        const { id } = req.params;
        const userId = parseInt(id);
        const db = req.db;
        const collection = db.collection('users');
        collection.findOne({
            _id: ObjectId(userId)
        }, (err, data) => {
            if (err) {
                return next(err);
            }

            collection.remove({
                _id: ObjectId(userId)
            }, (err, result) => {
                if (err) {
                    return next(new Error('can not delete'));
                }
                return res.status(200).json({
                    message: 'delete user successful',
                    data: result
                });
            });
        });

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};