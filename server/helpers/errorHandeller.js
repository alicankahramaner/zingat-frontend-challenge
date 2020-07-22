const errorHandeller = (error, req, res, next) => {
    console.log('Error: ', error);
}

module.exports = errorHandeller;