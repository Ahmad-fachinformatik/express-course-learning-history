const products = [{ id: 1, name: "Laptop", price: 999 }, { id: 2, name: "Mouse", price: 25 }];
const productsResult = document.getElementById("productsResult");
products.forEach(function (product) { productsResult.innerHTML += `<div><strong>${product.name}</strong><br>Price: ${product.price}</div>`; });
