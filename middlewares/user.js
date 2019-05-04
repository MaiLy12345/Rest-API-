'use strict';

exports.validateCreateUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return next(new Error('USERNAME_REQUIRED'));
    }

    if (!password) {
        return next(new Error('PASSWORD_REQUIRED'));
    }

    return next();
};

exports.validateGetUserById = (req, res, next) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (Number.isNaN(userId)) {
        return next(new Error('USER_ID_IS_NOT_A_NUMBER'));
    }

    return next();
};


exports.validateDeleteUser = (req, res, next) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (Number.isNaN(userId)) {
        return next(new Error('USER_ID_IS_NOT_A_NUMBER'));
    }

    return next();
};