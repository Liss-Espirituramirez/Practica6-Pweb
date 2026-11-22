const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
     app.post('/productos', (req, res) => {
        const { nombre, descripcion, precio} = req.body
        
        // validación de datos
        if (!nombre || !descripcion || precio === undefined || precio === '') {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            })
        }
             const precioNumero = parseFloat(precio)

          // El precio debe ser mayor que 0
          if (isNaN(precioNumero) || precioNumero <= 0) {
              return res.status(400).json({
                mensaje: 'El precio debe ser un número mayor que 0'
        })
    }


     // Crear un nuevo id que no se repita con los existentes

    const nuevoId = productos.length > 0 
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1
    
    const nuevoProducto = {
       id: nuevoId,
         nombre,
         descripcion,
         precio: precioNumero

    }

    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)

}) 

// TODO: PUT /productos/:id - Actualizar producto

app.put('/productos/:id',(req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)
 
    // si no existe, 404 
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const { nombre, descripcion, precio} = req.body

    // Validacion de los campos
    if (!nombre || !descripcion || precio === undefined || precio === '') {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        })
    }

    const PrecioNumero = parseFloat(precio)

    //El precio debe ser mayor que 0
    if (isNaN(PrecioNumero) || PrecioNumero <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor que 0'
        })
    }

    // Reemplazar datos con el mismo id
    productos[indice] = {
        id: id,
        nombre,
        descripcion,
        precio: PrecioNumero
    }
    
    res.status(200).json(productos[indice])
})


// TODO: DELETE /productos/:id - Eliminar producto

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // si no existe, 404 
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const productoEliminado = productos.splice(indice, 1)[0]
    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
