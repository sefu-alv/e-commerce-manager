const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('../Develop/config/connection');
sequelize.sync();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
