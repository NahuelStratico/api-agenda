const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const { Persona } = require('./sequelize');


// Rutas
app.get('/personas', (req, res) => {
    Persona.findAll()
    .then(persona => {
        console.log(persona);
        res.json(persona);
    })
    
})

app.post('/personas/nuevo', (req, res) => {
    console.log(req.body);
    Persona.create({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono
    }).then(persona => {
        res.send('Persona creada');
    })
    
})

app.get('/personas/:id', (req, res) => {
    let personaId = req.params.id;
    Persona.findOne({where: {id: personaId} })
    .then(persona => {
        res.json(persona)
    })
})

app.put('/personas/:id', (req, res) => {
    let personaId = req.params.id;
    let nuevosDatos = req.body;
    Persona.findOne( { where: { id: personaId } } )
    .then(persona => {
        persona.update(nuevosDatos)
        .then( nuevaPersona => {
            res.json(nuevaPersona)
        })
    })
  
})

app.delete('/personas/:id', (req, res) => {
    let personaId = req.params.id;

    Persona.destroy({
        where: {
            id: personaId
        }
    })
    .then( () => {
        res.send('persona eliminada');
    })
})


// Servidor iniciado
app.listen( 3000, () => {
    console.log('server conectado on port 3000');
})