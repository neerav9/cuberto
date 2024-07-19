document.addEventListener("DOMContentLoaded", function() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const productList = document.getElementById('product-list');
            displayProducts(products, productList);
        })
        .catch(error => console.error('Error fetching products:', error));
});

function displayProducts(products, productList) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const productImg = document.createElement('img');
        productImg.src = product.photo;
        productDiv.appendChild(productImg);

        const productName = document.createElement('h3');
        const productLink = document.createElement('a');
        productLink.textContent = product.productName;
        productLink.href = `product.html?id=${product.id}`;
        productName.appendChild(productLink);
        productDiv.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = 'Price: ' + product.price.toFixed(2);
        productDiv.appendChild(productPrice);

        productList.appendChild(productDiv);
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let filteredProducts = data.products;
            if (selectedCategory !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
            }
            if (selectedPriceRange !== 'all') {
                filteredProducts = filteredProducts.filter(product => {
                    const price = parseFloat(product.price);
                    switch (selectedPriceRange) {
                        case '0-999':
                            return price < 1000;
                        case '1000-4999':
                            return price >= 1000 && price <= 4999;
                        case '5000-9999':
                            return price >= 5000 && price <= 9999;
                        case '10000':
                            return price >= 10000;
                        default:
                            return true;
                    }
                });
            }
            const productList = document.getElementById('product-list');
            displayProducts(filteredProducts, productList);
        })
        .catch(error => console.error('Error fetching products:', error));
}
