module.exports = (sequelize, Datatypes) => {

    const Post = sequelize.define(
        "Post",
        {
            id: {
                type: Datatypes.UUID,
                defaultValue: Datatypes.UUIDV1,
                allowNull: false,
                primaryKey: true
            },
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
