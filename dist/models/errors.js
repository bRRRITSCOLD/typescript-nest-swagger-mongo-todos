"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIErrorSource = (errorSource = { pointer: undefined, param: undefined }) => {
    try {
        const apiErrorSource = {
            pointer: errorSource.pointer || undefined,
            param: errorSource.param || undefined
        };
        return apiErrorSource;
    }
    catch (err) {
        throw err;
    }
};
exports.APIError = (error) => {
    try {
        const apiError = {
            title: error.message || error.title || 'uncaught exception',
            statusCode: error.statusCode || 500,
            source: error.source ? exports.APIErrorSource(error.source) : exports.APIErrorSource({}),
            detail: error.stack || error.detail
        };
        if (process.env.NODE_ENV === 'PREP' || process.env.NODE_ENV === 'PROD')
            apiError.detail = undefined;
        return apiError;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=errors.js.map