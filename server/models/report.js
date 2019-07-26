module.exports = (sequelize, Datatypes) => {

    const Report = sequelize.define(
        "Report",
        {
            post: Datatypes.STRING,
            reporter: Datatypes.STRING,
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
    //   Report.associate = models => {
    //     models.Report.hasOne(models.User);
    //   };


    return Report;
};
