const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let luchadores = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Read:
app.get('/luchadores', (req, res) => {
    res.json(luchadores);
    console.log(req.params);
});
// añadir nuevo luchador
app.post('/luchadores', (req, res) => {
    const nuevoLuchador = {
        id: luchadores.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    luchadores.push(nuevoLuchador);
    res.redirect('/luchadores');
});

//Buscar por nombre

app.get('/luchadores/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    console.log(req.params);
    const luchador = luchadores.find(lu => lu.nombre === nombre);
    if (!luchador) {
        res.status(404).json({ mensaje: 'Luchador no encontrado' });
    } else {
        res.json(luchador);
    }
});

// delete
app.delete('/luchadores/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    luchadores = luchadores.filter(lu => lu.nombre !== nombre);
    res.json({ mensaje: 'Luchador eliminado' });

});

//El findIndex()método devuelve -1 si no se encuentra ninguna coincidencia.
//put
app.put('/luchadores/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const luchadorIndex = luchadores.findIndex(lu => lu.nombre === nombre);

    if (luchadorIndex === -1) {
        res.status(404).json({ mensaje: 'Luchador no econtrado' });
    } else {
        luchadores[luchadorIndex].edad = req.body.edad;
        luchadores[luchadorIndex].lugarProcedencia = req.body.lugarProcedencia;
        res.json(luchadores[luchadorIndex]);
    }
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});