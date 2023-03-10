module.exports = ( sequelize , Sequelize ) => {

    const post = sequelize.define(
        'post',
        {
            p_id: { type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true, field: 'p_id' },
            p_title: { type: Sequelize.STRING(255), allowNull: false, field: 'p_title' },
            p_detail: { type: Sequelize.STRING(255), allowNull: false, field: 'p_detail' },
            p_role: { type: Sequelize.STRING(255), allowNull: false, field: 'p_role' },
            p_dtime: { type: Sequelize.DATE, allowNull: false, field: 'p_dtime' },
        },
        {
            tableName: 'post' 
        }
      );
      
      return post;
}