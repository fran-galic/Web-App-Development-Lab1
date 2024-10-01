# Web App Development - Lab 1

## Course Overview

The **Web App Development** course introduces fundamental concepts and technologies for web development, focusing on web architectures, protocols, and standards. Students learn to build dynamic web applications using HTML5, CSS, and JavaScript on the client side, and Node.js on the server side. The course is divided into two parts:

1. **Lab 1**: Client-side development using HTML, CSS, and JavaScript.
2. **Lab 2**: Server-side development with Node.js and Express.

The goal is to understand web communication protocols, design user interfaces, and create full-stack web applications.

---

## Lab 1: Web Shop Application

### Overview

In **Lab 1**, the task was to create a simple web shop application with the following features:

- A product page where users can browse products by category.
- A cart page where users can manage the items they have added to their cart.
- Cart management that allows users to increase, decrease, or remove items from the cart.
- Use of **LocalStorage** to save cart data between sessions.

### Technologies Used

- **HTML5**: Structure of the web pages.
- **CSS**: Styling and layout of the web shop.
- **JavaScript**: Interactivity, including product filtering, cart management, and saving data to LocalStorage.

### Features

1. **Product Browsing**:
   - Users can view products based on different categories.
   - Clicking on a product displays its details.

2. **Cart Management**:
   - Users can add products to their cart.
   - The cart page allows users to adjust the quantity of items or remove items.
   - Cart data is stored in **LocalStorage**, so it persists across page reloads.

3. **LocalStorage**:
   - Cart data is saved locally, ensuring that users can return to the site later and find their cart unchanged.

### Project Structure

/root  
├── /images  
├── /scripts  
│   ├── cart.js  
│   ├── data.js  
├── /styles  
│   └── main.css  
├── cart.html  
└── index.html  

- **index.html**: Main product page with categories.
- **cart.html**: Cart page for managing items.
- **cart.js**: JavaScript logic for managing the cart.
- **data.js**: Contains product data and category information.

---

## Lab 2 (Upcoming)

The second lab will build on this project by adding server-side functionality using **Node.js** and **Express**, including handling product data dynamically and managing user sessions.
