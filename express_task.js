import express from "express";

const app = express();
app.use(express.json());

const users = [];
const products = [];
let cart = [];
const orders = [];

//signup
app.post("/signup", (req, res) => {
  const { email, password, id } = req.body;
  users.push({ email, password, id });
  res.send("User SignUp successfully");
});

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.send("User login successfully");
  } else {
    res.send("email or password not correct");
  }
});

// ==================== Products CRUD ====================

// get products
app.get("/Products", (req, res) => {
  res.send(products);
});

//add products
app.post("/Products/add", (req, res) => {
  const { id, name, price } = req.body;
  products.push({ id, name, price });
  res.send("Product added successfully");
});

//update products
app.put("/Products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find((p) => p.id === id);
  if (product) {
    product.name = name;
    product.price = price;
    res.send("Product updated successfully");
  } else {
    res.send("Product not found");
  }
});

//delet products
app.delete("/Products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.send("Product deleted successfully");
  } else {
    res.send("Product not found");
  }
});
// ==================== Cart CRUD ====================
//Get cart items
app.get("/cart", (req, res) => {
  res.send(cart);
});

//Add to cart
app.post("/cart", (req, res) => {
  const { id, productId, quantity } = req.body;
  cart.push({ id, productId, quantity });
  res.send("Item added to cart successfully");
});

//Update cart item quantity
app.put("/cart/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const item = cart.find((c) => c.id === id);

  if (item) {
    item.quantity = quantity;
    res.send("Cart item updated successfully");
  } else {
    res.send("Cart item not found");
  }
});

//Delete item from cart
app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  const index = cart.findIndex((c) => c.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
    res.send("Item removed from cart successfully");
  } else {
    res.send("Cart item not found");
  }
});
// ==================== Orders ====================
//Get all orders
app.get("/orders", (req, res) => {
  res.send(orders);
});
app.post("/orders", (req, res) => {
  const { id, userId } = req.body;
  if (cart.length === 0) {
    return res.send("Cart is empty, cannot make order");
  }
  orders.push({
    id,
    userId,
    items: [...cart],
  });
  cart = [];

  res.send("Order placed successfully and cart cleared");
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
