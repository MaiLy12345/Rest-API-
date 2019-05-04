'use strict';
const errorMessage = require('../locales/vi.json');

class Response {
    static success(res, data) {
        const responseData = !data ? { success: true } : { success: true, result: data };
        return res.json(responseData);
    };

    static error(res, err) {
        return res.json({
           success: false,
           errors: {
               code: err.message || err,
               message: errorMessage[err.message]
           }
        });
    }
}

module.exports = Response;