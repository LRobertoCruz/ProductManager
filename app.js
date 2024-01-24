const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const manager = new ProductManager('./productos.json');
manager.init();

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const productList = limit ? manager.getProducts().slice(0, limit) : manager.getProducts();
    res.json({ products: productList });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = manager.getProductById(productId);
    
    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
