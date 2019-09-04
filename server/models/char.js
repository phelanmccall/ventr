module.exports = (sequelize, Datatypes) => {

    const Char = sequelize.define(
        "Char",
        {
            name: {
                type: Datatypes.STRING,
                allowNull: false
            },
            avatar:  {
                type: Datatypes.STRING,
                default: "https://via.placeholder.com/150"
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
            }
        }

    );
    //   Char.associate = models => {
    //     models.Char.hasOne(models.User);
    //   };


    return Char;
};
