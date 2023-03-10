module.exports = ( sequelize , Sequelize ) => {

const company = sequelize.define(
    'company',
    {
        c_id: { type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true, field: 'c_id' },
        c_fname: { type: Sequelize.STRING(255), allowNull: false, field: 'c_fname' },
        c_lname: { type: Sequelize.STRING(255), allowNull: false, field: 'c_lname' },
        c_uname: { type: Sequelize.STRING(255), allowNull: false, field: 'c_uname' },
        c_pass: { type: Sequelize.STRING(255), allowNull: false, field: 'c_pass' },
        c_email: { type: Sequelize.STRING(255), allowNull: false, field: 'c_email' },
        c_subscription: { type: Sequelize.BOOLEAN, default:false, allowNull: false, field: 'c_subscription' },
    },
    {
        tableName: 'company' 
    }
  );
  
  return company;
}