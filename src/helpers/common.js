const isNullOrUndefinedOrEmpty = (obj)=> {
    return typeof obj === undefined || typeof obj === null || obj === '';
}

const ResponseType = (obj = {} || '', success = true, status = 200, error = { code: 0, message: '' }) => {
    return {
        success: obj === false ? false : success,
        status: status,
        error: error,
        data: obj
    }
}

module.exports = {
    ResponseType,
    isNullOrUndefinedOrEmpty
}