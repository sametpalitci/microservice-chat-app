const {API_USERS_PORT, API_URL, API_CHAT_GROUP_PORT, API_CHAT_PORT} = process.env;
module.exports = {
    "services": {
        "users": {
            "apiName": "users",
            "port": API_USERS_PORT
        },
        "chat-group": {
            "apiName": "chat-group",
            "port": API_CHAT_GROUP_PORT
        },
        "chat": {
            "apiName": "chat",
            "port": API_CHAT_PORT
        }
    },
    'host': API_URL
}