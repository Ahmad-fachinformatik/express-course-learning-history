const loadCustomersButton = document.getElementById("loadCustomersButton");
    const customersResult = document.getElementById("customersResult");
    const loadProductsButton = document.getElementById("loadProductsButton");
    const productsResult = document.getElementById("productsResult");
    const customerNameInput = document.getElementById("customerNameInput");
    const customerCityInput = document.getElementById("customerCityInput");
    const addCustomerButton = document.getElementById("addCustomerButton");
    const customerMessage = document.getElementById("customerMessage");
    const productNameInput = document.getElementById("productNameInput");
    const productPriceInput = document.getElementById("productPriceInput");
    const addProductButton = document.getElementById("addProductButton");
    const productMessage = document.getElementById("productMessage");
    let editingCustomerId = null;
    function showMessage(element, message, className) { if (element) { element.innerHTML = message; element.className = className || ""; } }
    function createCustomerHTML(customer) {
      return `<div class="item"><strong>${customer.name}</strong><br>City: ${customer.city}<br></div>`;
    }
    function createProductHTML(product) {
      return `<div class="item"><strong>${product.name}</strong><br>Price: ${product.price}<br></div>`;
    }
    function loadCustomers() {
      if (productMessage) showMessage(productMessage, "", "");
      customersResult.innerHTML = "Loading customers...";
      fetch("http://localhost:3000/customers")
        .then(function (response) { if (!response.ok) { throw new Error("Could not load customers"); } return response.json(); })
        .then(function (customers) { customersResult.innerHTML = ""; if (customers.length === 0) { customersResult.innerHTML = "No customers found"; return; } customers.forEach(function (customer) { customersResult.innerHTML += createCustomerHTML(customer); }); })
        .catch(function () { customersResult.innerHTML = "Could not load customers"; });
    }
    function loadProducts() {
      if (customerMessage) showMessage(customerMessage, "", "");
      productsResult.innerHTML = "Loading products...";
      fetch("http://localhost:3000/products")
        .then(function (response) { if (!response.ok) { throw new Error("Could not load products"); } return response.json(); })
        .then(function (products) { productsResult.innerHTML = ""; if (products.length === 0) { productsResult.innerHTML = "No products found"; return; } products.forEach(function (product) { productsResult.innerHTML += createProductHTML(product); }); })
        .catch(function () { productsResult.innerHTML = "Could not load products"; });
    }
    loadCustomersButton.addEventListener("click", loadCustomers);
loadProductsButton.addEventListener("click", loadProducts);
