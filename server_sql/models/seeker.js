module.exports = ( sequelize , Sequelize ) => {

const seeker = sequelize.define(
    'seeker',
    {
        s_id: { type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true, field: 's_id' },
        s_fname: { type: Sequelize.STRING(255), allowNull: false, field: 's_fname' },
        s_lname: { type: Sequelize.STRING(255), allowNull: false, field: 's_lname' },
        s_uname: { type: Sequelize.STRING(255), allowNull: false, field: 's_uname' },
        s_pass: { type: Sequelize.STRING(255), allowNull: false, field: 's_pass' },
        s_email: { type: Sequelize.STRING(255), allowNull: false, field: 's_email' },
        s_subscription: { type: Sequelize.BOOLEAN, default:false, allowNull: false, field: 's_subscription' },
    },
    {
        tableName: 'seeker' 
    }
  );
  
  return seeker;
}