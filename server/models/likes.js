module.exports = (sequelize, Datatypes) => {

    const Like = sequelize.define(
        "Like",
        {
            post: Datatypes.UUID,
            user: Datatypes.STRING
        }

    );
    //   Like.associate = models => {
    //     models.Like.hasOne(models.User);
    //   };


    return Like;
};
