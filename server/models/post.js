module.exports = (sequelize, Datatypes) => {

    const Post = sequelize.define(
        "Post",
        {
            user: Datatypes.STRING,
            body: Datatypes.STRING,
            score: Datatypes.INTEGER,
            public: {
                type: Datatypes.BOOLEAN,
                defaultValue: true
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
