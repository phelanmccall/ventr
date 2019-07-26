module.exports = (sequelize, Datatypes) => {

    const Block = sequelize.define(
        "Block",
        {
            user1: Datatypes.STRING,
            user2: Datatypes.STRING
        }

    );
    //   Block.associate = models => {
    //     models.Block.hasOne(models.User);
    //   };


    return Block;
};
