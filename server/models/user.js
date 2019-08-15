module.exports = (sequelize, Datatypes) => {

    const User = sequelize.define(
      "User",
      {
        id: {
          type: Datatypes.UUID,
          defaultValue: Datatypes.UUIDV1,
          primaryKey: true
        },
        email:{
          type: Datatypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        username: {
          type: Datatypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        password: Datatypes.STRING,
        avatar:  {
          type: Datatypes.STRING,
          default: "https://via.placeholder.com/150"
        },
        bio: {
          type: Datatypes.STRING,
          default: ""
        }
      }
      
    );
 
  
    return User;
  };
  