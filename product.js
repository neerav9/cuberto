document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId)
    if (productId) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === productId);
                console.log(product);
                if (product) {
                    displayProductDetails(product);
                    const buyButton = document.getElementById('buy-button');
                    buyButton.addEventListener('click', function() {
                        addToCart(product);
                    });
                } else {
                    displayError('Product not found');
                }
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                displayError('Error fetching product');
            });
    } else {
        displayError('Product ID not provided');
    }
});

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <div class="product-container">
            <div class="product-image">
                <img class="p-photo" src="${product.photo}" alt="${product.productName}">
            </div>
            <div class="product-details" style="width:400px; margin-top:2rem;">
                <h2>${product.productName}</h2>
                <p class="p-price"><b>Price :   </b> $${product.price.toFixed(2)}</p>
                <p class="p-category"><b>Category   :   </b> ${product.category}</p>
                <p class="p-rating"><b>Rating   :   </b> ${product.rating}</p>
                <p class="p-company"><b>Company :   </b>${product.company}</p>
                <p class="p-qty"><b>Quantity    :   </b> ${product.quantity}</p>
                <p class="p-desp"><b>Description    :   </b>${product.description}</p>
                <button id="buy-button">Buy Now</button>
            </div>
        </div>
    `;
}


function displayError(message) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `<p>${message}</p>`;
}

function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        photo: product.photo
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    window.location.href = 'cart.html';
}
