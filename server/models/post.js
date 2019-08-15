module.exports = (sequelize, Datatypes) => {

    const Post = sequelize.define(
        "Post",
        {
            user: {
                type: Datatypes.STRING,
                allowNull: false
            },
            body: {
                type: Datatypes.STRING,
                defaultValue: ""
            },
            score: {
                type: Datatypes.INTEGER,
                defaultValue: 0
            },
            privacy: {
                type: Datatypes.STRING,
                defaultValue: "public"
            },
            reported: {
                type: Datatypes.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                type: Datatypes.DATE,
                defaultValue: Datatypes.NOW
            },
            updatedAt: {
                type: Datatypes.DATE,
                defaultValue: Datatypes.NOW
            }
        }

    );
    //   Post.associate = models => {
    //     models.Post.hasOne(models.User);
    //   };


    return Post;
};
