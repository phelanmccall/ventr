module.exports = (sequelize, Datatypes) => {

    const User = sequelize.define(
      "User",
      {
        email: Datatypes.STRING,
        username: Datatypes.STRING,
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
  