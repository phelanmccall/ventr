module.exports = (sequelize, Datatypes) => {

    const Setting = sequelize.define(
      "Setting",
      {
        user: Datatypes.STRING,
        privacy: Datatypes.STRING,
        mode: Datatypes.STRING
      }
      
    );
 
  
    return Setting;
  };
  