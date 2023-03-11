module.exports = (sequelize, DataTypes) => {
    const seeker = sequelize.define('seeker', {
      s_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      s_fname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      s_lname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      s_uname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      s_pass: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      s_email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      s_subscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }, {
      tableName: 'seeker'
    });
  
    return seeker;
  };