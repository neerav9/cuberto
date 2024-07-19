
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/addProduct', (req, res) => {
    const newProduct = req.body;
    fs.readFile(path.join(__dirname, 'public', 'products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const products = JSON.parse(data);
        newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(newProduct);
        fs.writeFile(path.join(__dirname, 'public', 'products.json'), JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send({ message: 'Product added successfully!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
