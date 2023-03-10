module.exports = ( sequelize , Sequelize ) => {

    const interest = sequelize.define(
        'interestr',
        {
            in_dtime: { type: Sequelize.DATE, primaryKey: true, autoIncrement: true, field: 'in_dtime' },
        },
        {
            tableName: 'interest' 
        }
      );
      
      return interest;
}