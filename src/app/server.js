const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const { server } = require('typescript');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de SQL Server
const config = {
user: 'root',
password: '',
server: '127.0.0.1',
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

// Ruta de ejemplo para obtener productos
app.get('/api/productos', async (req, res) => {
try {
const result = await sql.query`SELECT * FROM productos`;
res.json(result.recordset);
} catch (err) {
res.status(500).send(err);
}
});

// Ruta para obtener un producto por ID
    app.get('/api/productos/:id', async (req, res) => {
    const id = req.params.id;
    try {
    const result = await sql.query`SELECT * FROM productos WHERE id = ${id}`;
    res.json(result.recordset[0]);
    } catch (err) {
    res.status(500).send(err);
    }
    });

// Ruta para crear un nuevo producto
app.post('/api/productos', async (req, res) => {
const { name, price, description } = req.body;
try {
await sql.query`INSERT INTO productos (nombre, precio, descripcion) VALUES (${nombre}, ${precio},
${descripcion})`;
res.status(201).send('Product created');
} catch (err) {
res.status(500).send(err);
}
});

// Ruta para actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
const id = req.params.id;
const { name, price, description } = req.body;
try {
await sql.query`UPDATE productos SET Name = ${nombre}, Price = ${precio}, Description =
${descripcion} WHERE ProductID = ${id}`;
res.send('Product updated');
} catch (err) {
res.status(500).send(err);
}
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
const id = req.params.id;
try {
await sql.query`DELETE FROM productos WHERE id = ${id}`;
res.send('Product deleted');
} catch (err) {
res.status(500).send(err);
}
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});