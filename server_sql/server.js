const SQLite = require('sqlite3').verbose();

const express = require("express");
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
res.json({"test":"pass"});
});

app.listen(3000, () =>{
console.log("sever run on port " + 3000);
});


const { Sequelize } = require('sequelize');

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(
 'JobFinder_db',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.company = require("./models/company")( sequelize , Sequelize );
  db.seeker = require("./models/seeker")( sequelize , Sequelize );
  db.post = require("./models/posts")( sequelize , Sequelize );
  db.interest = require("./models/interest")( sequelize , Sequelize );

  db.company.hasMany(
    db.post,
    {
        foreignKey: { name: 'c_id', field: 'c_id' },
    }
  );

  db.seeker.belongsToMany(db.post, { through: db.interest });
  db.post.belongsToMany(db.seeker, { through: db.interest });

  sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

  module.exports = db;