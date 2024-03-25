const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n${Date.now()} ${req.method} ${req.ip} ${req.path}`, (err) => {
            if (err) {
                // Handle error, log it, or pass it to next middleware
                console.error('Error appending to log file:', err);
                next(err); // Optionally pass the error to the next middleware
            } else {
                next(); // Call next middleware
            }
        });
    };
}

module.exports = {
    logReqRes,
};
