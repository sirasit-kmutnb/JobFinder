module.exports = (sequelize, DataTypes) => {
    const interest = sequelize.define('interest', {
      in_dtime: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      tableName: 'interest'
    });
  
    return interest;
  };