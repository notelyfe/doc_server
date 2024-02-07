const allowedOrigin = require("./allowedOrigin")

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, origin)
        } else {
            callback(new Error("Not Allowed By Cors"))
        }
    },
    Credential: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions