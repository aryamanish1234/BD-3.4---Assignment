const express = require('express');
const app = express();
let cors = require('cors');

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];


app.get('/', (req, res) => {
   res.send("BD 3.4 - Assignment")
  });
// Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  
  cart.push({
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity)
  });
  
  res.json({ cartItems: cart });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  
  cart = cart.map(item => {
    if (item.productId === parseInt(productId)) {
      return { ...item, quantity: parseInt(quantity) };
    }
    return item;
  });
  
  res.json({ cartItems: cart });
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  
  cart = cart.filter(item => item.productId !== parseInt(productId));
  
  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  res.json({ totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  res.json({ totalPrice });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
