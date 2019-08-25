module.exports = (sequelize, Datatypes) => {

    const Follow = sequelize.define(
        "Follow",
        {
            user1: {
                type: Datatypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            user2: {
                type: Datatypes.UUID,
                allowNull: false,
                primaryKey: true
            },
           
        }

    );
    //   Follow.associate = models => {
    //     models.Follow.hasOne(models.User);
    //   };


    return Follow;
};
