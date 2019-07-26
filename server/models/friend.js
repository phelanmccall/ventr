module.exports = (sequelize, Datatypes) => {

    const Friend = sequelize.define(
        "Friend",
        {
            user1: Datatypes.STRING,
            user2: Datatypes.STRING
        }

    );
    //   Friend.associate = models => {
    //     models.Friend.hasOne(models.User);
    //   };


    return Friend;
};
