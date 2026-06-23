// =======================
// HTML Elements
// =======================

const loadCustomersButton = document.getElementById("loadCustomersButton");
const customersResult = document.getElementById("customersResult");

const customerNameInput = document.getElementById("customerNameInput");
const customerCityInput = document.getElementById("customerCityInput");
const addCustomerButton = document.getElementById("addCustomerButton");
const cancelEditCustomerButton = document.getElementById("cancelEditCustomerButton");
const customerMessage = document.getElementById("customerMessage");

const loadProductsButton = document.getElementById("loadProductsButton");
const productsResult = document.getElementById("productsResult");

const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const addProductButton = document.getElementById("addProductButton");
const cancelEditProductButton = document.getElementById("cancelEditProductButton");
const productMessage = document.getElementById("productMessage");

// =======================
// State Variables
// =======================

let editingCustomerId = null;
let editingProductId = null;

// =======================
// Message Functions
// =======================

function clearCustomerMessage() {
    customerMessage.innerHTML = "";
    customerMessage.className = "";
}

function clearProductMessage() {
    productMessage.innerHTML = "";
    productMessage.className = "";
}

function showMessage(element, message, className) {
    element.innerHTML = message;
    element.className = className;
}

// =======================
// Validation Functions
// =======================

function validateCustomerForm(name, city) {
    if (name === "") {
        showMessage(customerMessage, "Customer name is required", "error-message");
        return false;
    }

    if (city === "") {
        showMessage(customerMessage, "Customer city is required", "error-message");
        return false;
    }

    return true;
}

function validateProductForm(name, price) {
    if (name === "") {
        showMessage(productMessage, "Product name is required", "error-message");
        return false;
    }

    if (productPriceInput.value.trim() === "") {
        showMessage(productMessage, "Product price is required", "error-message");
        return false;
    }

    if (isNaN(price)) {
        showMessage(productMessage, "Product price must be a number", "error-message");
        return false;
    }

    if (price < 0) {
        showMessage(productMessage, "Product price must be greater than or equal to 0", "error-message");
        return false;
    }

    return true;
}

// =======================
// Reset Form Functions
// =======================

function resetCustomerForm() {
    editingCustomerId = null;

    customerNameInput.value = "";
    customerCityInput.value = "";

    addCustomerButton.innerHTML = "Add Customer";

    cancelEditCustomerButton.style.display = "none";
}

function resetProductForm() {
    editingProductId = null;

    productNameInput.value = "";
    productPriceInput.value = "";

    addProductButton.innerHTML = "Add Product";

    cancelEditProductButton.style.display = "none";
}


// =======================
// Edit Functions
// =======================

function startEditCustomer(id, name, city) {
    editingCustomerId = id;

    customerNameInput.value = name;
    customerCityInput.value = city;

    addCustomerButton.innerHTML = "Update Customer";

    cancelEditCustomerButton.style.display = "inline-block";

    showMessage(customerMessage, "Editing customer with id: " + id, "loading-message");
}

function cancelEditCustomer() {
    resetCustomerForm();

    showMessage(customerMessage, "Edit cancelled", "loading-message");
}

function startEditProduct(id, name, price) {
    editingProductId = id;

    productNameInput.value = name;
    productPriceInput.value = price;

    addProductButton.innerHTML = "Update Product";

    cancelEditProductButton.style.display = "inline-block";

    showMessage(productMessage, "Editing product with id: " + id, "loading-message");
}

function cancelEditProduct() {
    resetProductForm();

    showMessage(productMessage, "Edit cancelled", "loading-message");
}

// =======================
// HTML Template Functions
// =======================

function createCustomerHTML(customer) {
    return `
        <div class="item">
            <div class="item-content">
                <strong>${customer.name}</strong>
                <span>City: ${customer.city}</span>
            </div>

            <div class="item-actions">
                <button type="button" onclick="startEditCustomer(${customer.id}, '${customer.name}', '${customer.city}')">
                    Edit Customer
                </button>

                <button class="delete-button" type="button" onclick="deleteCustomer(${customer.id}, this)">
                    Delete Customer
                </button>
            </div>
        </div>
    `;
}

function createProductHTML(product) {
    return `
        <div class="item">
            <div class="item-content">
                <strong>${product.name}</strong>
                <span>Price: ${product.price}</span>
            </div>

            <div class="item-actions">
                <button type="button" onclick="startEditProduct(${product.id}, '${product.name}', ${product.price})">
                    Edit Product
                </button>

                <button class="delete-button" type="button" onclick="deleteProduct(${product.id}, this)">
                    Delete Product
                </button>
            </div>
        </div>
    `;
}

// =======================
// Load Functions
// =======================

function loadCustomers() {
    clearProductMessage();

    console.log("Loading customers");

    customersResult.innerHTML = "Loading customers...";

    fetch("http://localhost:3000/customers")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load customers");
            }

            return response.json();
        })
        .then(function (customers) {
            customersResult.innerHTML = "";

            if (customers.length === 0) {
                customersResult.innerHTML = "No customers found";
                return;
            }

            customers.forEach(function (customer) {
                customersResult.innerHTML += createCustomerHTML(customer);
            });
        })
        .catch(function (error) {
            console.log(error.message);

            customersResult.innerHTML = "Could not load customers";
        });
}

function loadProducts() {
    clearCustomerMessage();

    console.log("Loading products");

    productsResult.innerHTML = "Loading products...";

    fetch("http://localhost:3000/products")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load products");
            }

            return response.json();
        })
        .then(function (products) {
            productsResult.innerHTML = "";

            if (products.length === 0) {
                productsResult.innerHTML = "No products found";
                return;
            }

            products.forEach(function (product) {
                productsResult.innerHTML += createProductHTML(product);
            });
        })
        .catch(function (error) {
            console.log(error.message);

            productsResult.innerHTML = "Could not load products";
        });
}


// =======================
// Delete Functions
// =======================

function deleteCustomer(id, button) {
    clearProductMessage();

    const confirmed = confirm("Are you sure you want to delete this customer?");

    if (!confirmed) {
        return;
    }

    button.disabled = true;

    console.log("Deleting customer with id:", id);

    fetch("http://localhost:3000/customers/" + id, {
        method: "DELETE"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not delete customer");
            }

            return response.json();
        })
        .then(function (result) {
            console.log(result);

            showMessage(customerMessage, "Customer deleted successfully", "success-message");

            loadCustomers();
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(customerMessage, "Could not delete customer", "error-message");
        })
        .finally(function () {
            button.disabled = false;
        });
}

function deleteProduct(id, button) {
    clearCustomerMessage();

    const confirmed = confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
        return;
    }

    button.disabled = true;

    console.log("Deleting product with id:", id);

    fetch("http://localhost:3000/products/" + id, {
        method: "DELETE"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not delete product");
            }

            return response.json();
        })
        .then(function (result) {
            console.log(result);

            showMessage(productMessage, "Product deleted successfully", "success-message");

            loadProducts();
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(productMessage, "Could not delete product", "error-message");
        })
        .finally(function () {
            button.disabled = false;
        });
}


// =======================
// Add / Update Customer Event
// =======================

addCustomerButton.addEventListener("click", function () {
    clearProductMessage();

    console.log("Customer button clicked");

    const name = customerNameInput.value.trim();
    const city = customerCityInput.value.trim();

    const isCustomerFormValid = validateCustomerForm(name, city);

    if (!isCustomerFormValid) {
        return;
    }

    addCustomerButton.disabled = true;

    if (editingCustomerId === null) {
        showMessage(customerMessage, "Adding customer...", "loading-message");

        fetch("http://localhost:3000/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                city: city
            })
        })
            .then(function (response) {
                return response.json().then(function (data) {
                    if (!response.ok) {
                        throw new Error(data.error || "Could not add customer");
                    }

                    return data;
                });
            })
            .then(function (newCustomer) {
                console.log(newCustomer);

                showMessage(customerMessage, "Customer added successfully", "success-message");

                customersResult.innerHTML = createCustomerHTML(newCustomer);

                resetCustomerForm();
            })
            .catch(function (error) {
                console.log(error.message);

                showMessage(customerMessage, error.message, "error-message");
            })
            .finally(function () {
                addCustomerButton.disabled = false;
            });

        return;
    }

    showMessage(customerMessage, "Updating customer...", "loading-message");

    fetch("http://localhost:3000/customers/" + editingCustomerId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            city: city
        })
    })
        .then(function (response) {
            return response.json().then(function (data) {
                if (!response.ok) {
                    throw new Error(data.error || "Could not update customer");
                }

                return data;
            });
        })
        .then(function (updatedCustomer) {
            console.log(updatedCustomer);

            showMessage(customerMessage, "Customer updated successfully", "success-message");

            resetCustomerForm();

            loadCustomers();
        })

        .catch(function (error) {
            console.log(error.message);

            showMessage(customerMessage, error.message, "error-message");
        })
        .finally(function () {
            addCustomerButton.disabled = false;
        });
});


// =======================
// Add / Update Product Event
// =======================

addProductButton.addEventListener("click", function () {
    clearCustomerMessage();

    console.log("Product button clicked");

    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);

    const isProductFormValid = validateProductForm(name, price);

    if (!isProductFormValid) {
        return;
    }

    addProductButton.disabled = true;

    if (editingProductId === null) {
        showMessage(productMessage, "Adding product...", "loading-message");

        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
        })
            .then(function (response) {
                return response.json().then(function (data) {
                    if (!response.ok) {
                        throw new Error(data.error || "Could not add product");
                    }

                    return data;
                });
            })
            .then(function (newProduct) {
                console.log(newProduct);

                showMessage(productMessage, "Product added successfully", "success-message");

                productsResult.innerHTML = createProductHTML(newProduct);

                resetProductForm();
            })
            .catch(function (error) {
                console.log(error.message);

                showMessage(productMessage, error.message, "error-message");
            })
            .finally(function () {
                addProductButton.disabled = false;
            });

        return;
    }

    showMessage(productMessage, "Updating product...", "loading-message");

    fetch("http://localhost:3000/products/" + editingProductId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: price
        })
    })
        .then(function (response) {
            return response.json().then(function (data) {
                if (!response.ok) {
                    throw new Error(data.error || "Could not update product");
                }

                return data;
            });
        })
        .then(function (updatedProduct) {
            console.log(updatedProduct);

            showMessage(productMessage, "Product updated successfully", "success-message");

            resetProductForm();

            loadProducts();
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(productMessage, error.message, "error-message");
        })
        .finally(function () {
            addProductButton.disabled = false;
        });
});

// =======================
// Button Events
// =======================

loadCustomersButton.addEventListener("click", function () {
    loadCustomers();
});

cancelEditCustomerButton.addEventListener("click", function () {
    cancelEditCustomer();
});

loadProductsButton.addEventListener("click", function () {
    loadProducts();
});

cancelEditProductButton.addEventListener("click", function () {
    cancelEditProduct();
});