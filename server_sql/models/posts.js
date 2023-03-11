module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
      p_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      p_title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      p_detail: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      p_role: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      p_dtime: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'post'
    });
  
    return post;
  };