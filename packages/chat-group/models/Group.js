module.exports = (sequelize,DataTypes)=>{
    const groups = sequelize.define('groups',{
        name:{
            type:DataTypes.STRING
        },
        userId:{
            type:DataTypes.INTEGER
        }
    });

    return groups;
}