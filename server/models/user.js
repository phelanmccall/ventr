module.exports = (sequelize, Datatypes) => {

    const User = sequelize.define(
      "User",
      {
        email: Datatypes.STRING,
        username: Datatypes.STRING,
        password: Datatypes.STRING,
        avatar: Datatypes.STRING,
        bio: Datatypes.STRING
      }
      
    );
 
  
    return User;
  };
  