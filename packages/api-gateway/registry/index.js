const {API_USERS_PORT, API_URL} = process.env;
module.exports = {
    "services": {
        "users": {
            "apiName": "users",
            "port": API_USERS_PORT
        }
    },
    'host': API_URL
}