module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('users',{
        email: {
            type:DataTypes.STRING,
            require:true,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            require: true
        }
    });
    return Users;
}