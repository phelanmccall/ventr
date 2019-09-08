module.exports = (sequelize, Datatypes) => {

    const Inventory = sequelize.define(
        "Inventory",
        {
            item: {
                type: Datatypes.STRING,
                allowNull: false
            },
            player: {
                type: Datatypes.STRING,
                allowNull: false
            }

        }

    );
    //   Inventory.associate = models => {
    //     models.Inventory.hasOne(models.User);
    //   };


    return Inventory;
};
