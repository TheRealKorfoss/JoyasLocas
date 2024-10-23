const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de SQL Server
const config = {
    user: 'root',
    password: '12345678',
    host: 'localhost',
    database: 'joyaslocas',
    options: {
        encrypt: true, // Para Azure
        enableArithAbort: true
    }
};

// Conexión a la base de datos
sql.connect(config, err => {
    if (err) {
        console.log('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

// Rutas para la tabla Productos
app.get('/api/productos', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Productos`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/productos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await sql.query`SELECT * FROM Productos WHERE IdProducto = ${id}`;
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen_url } = req.body;
    try {
        await sql.query`INSERT INTO Productos (nombre, descripcion, precio, stock, imagen_url) VALUES (${nombre}, ${descripcion}, ${precio}, ${stock}, ${imagen_url})`;
        res.status(201).send('Product created');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/api/productos/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock, imagen_url } = req.body;
    try {
        await sql.query`UPDATE Productos SET nombre = ${nombre}, descripcion = ${descripcion}, precio = ${precio}, stock = ${stock}, imagen_url = ${imagen_url} WHERE IdProducto = ${id}`;
        res.send('Product updated');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/api/productos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await sql.query`DELETE FROM Productos WHERE IdProducto = ${id}`;
        res.send('Product deleted');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rutas para la tabla Clientes (Ejemplo)
app.get('/api/clientes', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Clientes`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rutas para la tabla Carrito (Ejemplo)
app.get('/api/carrito', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Carrito`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
