const Sequelize = require('sequelize');
const PersonaModel = require('./models/Persona');
const DB = 'mysql://root@localhost:3306/api-agenda';

const sequelize = new Sequelize(DB);

const Persona = PersonaModel(sequelize, Sequelize);

sequelize.sync()
.then( () => {
    console.log('Tablas Creadas');
})

module.exports = {
    Persona
}