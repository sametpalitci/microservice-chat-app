module.exports = {
    apps: [
        {
            name: "API Gateway",
            cwd: "./packages/api-gateway",
            script: "npm",
            args: "start"
        },
        {
            name: "API Users",
            cwd: "./packages/users",
            script: "npm",
            args: "start"
        },
        {
            name: "API Chat Group",
            cwd: "./packages/chat-group",
            script: "npm",
            args: "start"
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
