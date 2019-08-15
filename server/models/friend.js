module.exports = (sequelize, Datatypes) => {

    const Friend = sequelize.define(
        "Friend",
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
            status: {
                type: Datatypes.STRING,
                defaultValue: "pending"
            }
        }

    );
    //   Friend.associate = models => {
    //     models.Friend.hasOne(models.User);
    //   };


    return Friend;
};
