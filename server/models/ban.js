module.exports = (sequelize, Datatypes) => {

    const Ban = sequelize.define(
        "Ban",
        {
            email: Datatypes.STRING
        }

    );
    //   Ban.associate = models => {
    //     models.Ban.hasOne(models.User);
    //   };


    return Ban;
};
