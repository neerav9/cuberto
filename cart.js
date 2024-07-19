let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update cart and local storage
function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart</p>';
    } else {
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
            <div class="cart-item-img">
            <img src="${item.photo}" alt="${item.productName}">
        </div>
        <div class="cart-item-details">
            <div class="productname"><p>${item.productName}</p></div>
            <p><b>Price:</b>$${item.price.toFixed(2)}</p>
            <p><b>Quantity:</b> ${item.quantity}</p>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
}

// Function to remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Function to add item to cart
function addItemToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        // If item with the same ID exists, increment quantity
        existingItem.quantity++;
    } else {
        // Otherwise, add a new item to the cart
        const newItem = {
            id: product.id,
            productName: product.productName,
            price: product.price,
            photo: product.photo,
            quantity: 1
        };
        cartItems.push(newItem);
    }

    updateCart();
}

// Display cart items on page load
renderCartItems();