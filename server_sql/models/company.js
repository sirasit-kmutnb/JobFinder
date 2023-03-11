module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('company', {
      c_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      c_fname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      c_lname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      c_uname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      c_pass: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      c_email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      c_subscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }, {
      tableName: 'company'
    });
  
    return company;
  };
