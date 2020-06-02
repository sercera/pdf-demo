const { API_KEYS } = require('../constants/api_keys')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error()
        }
        let apiKey
        try {
            const split = req.headers.authorization.split(' ')
            if (split[0] === 'ApiKey') {
                apiKey = split[1]
            }
            if (!apiKey) {
                throw new Error()
            }
        } catch (e) {
            return res.status(401).json({
                message: 'Invalid Authorization header format. Format is "{AUTHORIZATION_TYPE} {TOKEN|API_KEY}". For api key authorization use ApiKey as type'
            })
        }
        if (!API_KEYS.includes(apiKey)) {
            throw new Error()
        }
        req.apiKey = apiKey
    } catch (exception) {
        return res.status(401).json({
            message: 'Invalid API_KEY'
        })
    }
    return next()
}
