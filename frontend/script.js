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
      return `<div class="item"><strong>${customer.name}</strong><br>City: ${customer.city}<br><button class="delete-button" onclick="deleteCustomer(${customer.id}, this)">Delete Customer</button><button onclick="startEditCustomer(${customer.id}, '${customer.name}', '${customer.city}')">Edit Customer</button></div>`;
    }
    function createProductHTML(product) {
      return `<div class="item"><strong>${product.name}</strong><br>Price: ${product.price}<br><button class="delete-button" onclick="deleteProduct(${product.id}, this)">Delete Product</button></div>`;
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

        function addCustomer() {
          if (!customerNameInput.value.trim() || !customerCityInput.value.trim()) { showMessage(customerMessage, "Customer name and city are required", "error-message"); return; }
          addCustomerButton.disabled = true;
          const method = editingCustomerId ? "PUT" : "POST";
          const url = editingCustomerId ? "http://localhost:3000/customers/" + editingCustomerId : "http://localhost:3000/customers";
          fetch(url, { method: method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: customerNameInput.value.trim(), city: customerCityInput.value.trim() }) })
            .then(function (response) { if (!response.ok) { throw new Error("Could not save customer"); } return response.json(); })
            .then(function (customer) { showMessage(customerMessage, editingCustomerId ? "Customer updated successfully" : "Customer added successfully", "success-message"); customersResult.innerHTML = createCustomerHTML(customer); editingCustomerId = null; addCustomerButton.innerHTML = "Add Customer"; })
            .catch(function () { showMessage(customerMessage, "Could not save customer", "error-message"); })
            .finally(function () { addCustomerButton.disabled = false; });
        }

        function addProduct() {
          const price = Number(productPriceInput.value);
          if (!productNameInput.value.trim() || isNaN(price)) { showMessage(productMessage, "Product name and valid price are required", "error-message"); return; }
          addProductButton.disabled = true;
          fetch("http://localhost:3000/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: productNameInput.value.trim(), price: price }) })
            .then(function (response) { if (!response.ok) { throw new Error("Could not add product"); } return response.json(); })
            .then(function (product) { showMessage(productMessage, "Product added successfully", "success-message"); productsResult.innerHTML = createProductHTML(product); })
            .catch(function () { showMessage(productMessage, "Could not add product", "error-message"); })
            .finally(function () { addProductButton.disabled = false; });
        }
        function deleteCustomer(id, button) { if (!confirm("Are you sure you want to delete this customer?")) { return; } if (button) button.disabled = true; fetch("http://localhost:3000/customers/" + id, { method: "DELETE" }).then(function (response) { if (!response.ok) { throw new Error("Delete failed"); } return response.json(); }).then(function () { showMessage(customerMessage, "Customer deleted successfully", "success-message"); loadCustomers(); }).catch(function () { showMessage(customerMessage, "Could not delete customer", "error-message"); }).finally(function () { if (button) button.disabled = false; }); }
function deleteProduct(id, button) { if (!confirm("Are you sure you want to delete this product?")) { return; } if (button) button.disabled = true; fetch("http://localhost:3000/products/" + id, { method: "DELETE" }).then(function (response) { if (!response.ok) { throw new Error("Delete failed"); } return response.json(); }).then(function () { showMessage(productMessage, "Product deleted successfully", "success-message"); loadProducts(); }).catch(function () { showMessage(productMessage, "Could not delete product", "error-message"); }).finally(function () { if (button) button.disabled = false; }); }
function startEditCustomer(id, name, city) { editingCustomerId = id; customerNameInput.value = name; customerCityInput.value = city; addCustomerButton.innerHTML = "Update Customer"; }
const cancelEditCustomerButton = document.getElementById("cancelEditCustomerButton");
function cancelEditCustomer() { editingCustomerId = null; customerNameInput.value = ""; customerCityInput.value = ""; addCustomerButton.innerHTML = "Add Customer"; showMessage(customerMessage, "Edit cancelled", "loading-message"); }
cancelEditCustomerButton.addEventListener("click", cancelEditCustomer);
loadCustomersButton.addEventListener("click", loadCustomers);
loadProductsButton.addEventListener("click", loadProducts);
addCustomerButton.addEventListener("click", addCustomer);
addProductButton.addEventListener("click", addProduct);
