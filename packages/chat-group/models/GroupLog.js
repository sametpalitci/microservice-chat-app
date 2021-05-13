const Group = require('./Group');

module.exports = (sequelize, DataTypes) => {
    const GroupLogs = sequelize.define('grouplogs', {
        userId: {
            type: DataTypes.INTEGER,
            require: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            require: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            require: true
        }
    });
    GroupLogs.associate = (models)=>{
        GroupLogs.belongsTo(models.groups, { foreignKey: 'groupId'});
    }

    return GroupLogs;
}