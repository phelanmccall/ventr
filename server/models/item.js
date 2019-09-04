module.exports = (sequelize, Datatypes) => {

    const Item = sequelize.define(
        "Item",
        {
            id: {
                type: Datatypes.UUID,
                defaultValue: Datatypes.UUIDV1,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Datatypes.STRING,
                allowNull: false
            },
            description: {
                type: Datatypes.STRING,
                defaultValue: ""
            },
            stat: {
                type: Datatypes.STRING,
                defaultValue: "str"
            },
            effect: {
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
    //   Item.associate = models => {
    //     models.Item.hasOne(models.User);
    //   };


    return Item;
};
