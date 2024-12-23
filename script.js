// Initialize cart
let cart = [];

// Function to add product to the cart
function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase the quantity if already in the cart
    } else {
        cart.push(product); // Add product to cart if not already in it
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartContainer.innerHTML = ''; // Clear existing cart items
    let total = 0;

    // Loop through cart and display items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>$${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Update cart total and item count
    cartCount.textContent = cart.length;
    cartTotal.textContent = '$' + total.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to handle order tracking form submission
function trackOrder(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const orderId = document.getElementById('order-id').value;

    // Dummy data for order tracking (In real application, you would make an API call to check order status)
    const orderStatus = document.getElementById('order-status');
    if (orderId === '12345') {
        orderStatus.textContent = 'Order is being processed.';
    } else {
        orderStatus.textContent = 'Order not found. Please check your order ID.';
    }
}

// Event listener for the track order form
const orderForm = document.getElementById('track-order-form');
if (orderForm) {
    orderForm.addEventListener('submit', trackOrder);
}

// Function to update product details on the product page
function updateProductDetails(productId) {
    // In real-world application, you'd fetch the product details from the database
    const productDetails = {
        1: {
            name: 'Product 1',
            price: 19.99,
            description: 'This is a sample product description for Product 1.',
            image: 'https://via.placeholder.com/300x200'
        },
        2: {
            name: 'Product 2',
            price: 29.99,
            description: 'This is a sample product description for Product 2.',
            image: 'https://via.placeholder.com/300x200'
        }
        // Add more products as necessary
    };

    const product = productDetails[productId];
    if (product) {
        const productDetailSection = document.getElementById('product-details');
        productDetailSection.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p><strong>Price: $${product.price}</strong></p>
            <button onclick="addToCart(${productId}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
    }
}

// Check if product details section exists on the page
if (document.getElementById('product-details')) {
    // Simulate product page and load details for product with ID 1
    updateProductDetails(1); // You can dynamically load product ID based on URL or selection
}

