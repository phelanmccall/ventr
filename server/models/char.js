module.exports = (sequelize, Datatypes) => {

    const Char = sequelize.define(
        "Char",
        {
            name: {
                type: Datatypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            avatar:  {
                type: Datatypes.STRING,
                default: "https://via.placeholder.com/150"
              },
            level: {
                type: Datatypes.INT,
                default: 1
            },
            str: {
                type: Datatypes.INT,
                default: 5
            },
            def: {
                type: Datatypes.INT,
                default: 5
            },
            agi: {
                type: Datatypes.INT,
                default: 5
            },
            wis: {
                type: Datatypes.INT,
                default: 5
            },
            luk: {
                type: Datatypes.INT,
                default: 5
            },
            equippedHead: {
                type: Datatypes.STRING,
                default: ""
            },
            equippedTorso: {
                type: Datatypes.STRING,
                default: ""
            },
            equippedLHand: {
                type: Datatypes.STRING,
                default: ""
            },
            equippedRHand: {
                type: Datatypes.STRING,
                default: ""
            },
            equippedFoot: {
                type: Datatypes.STRING,
                default: ""
            }
           
        }

    );
    //   Char.associate = models => {
    //     models.Char.hasOne(models.User);
    //   };


    return Char;
};
