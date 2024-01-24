const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error.message);
        }
    }

    addProduct(product) {
        const newProduct = { id: this.getNextId(), ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(productId, updatedFields) {
        const index = this.products.findIndex(product => product.id === productId);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            console.log('Producto actualizado correctamente');
            return true;
        } else {
            console.log('Producto no encontrado');
            return false;
        }
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);

        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log('Producto eliminado correctamente');
            return true;
        } else {
            console.log('Producto no encontrado');
            return false;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    getNextId() {
        return this.products.length === 0 ? 1 : Math.max(...this.products.map(product => product.id)) + 1;
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados correctamente');
        } catch (error) {
            console.error('Error al guardar productos:', error.message);
        }
    }
}

module.exports = ProductManager;
