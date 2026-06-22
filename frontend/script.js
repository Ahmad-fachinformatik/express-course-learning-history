const customers = [{ id: 1, name: "Andi", city: "Dortmund" }, { id: 2, name: "Sara", city: "Berlin" }];
const customersResult = document.getElementById("customersResult");
customers.forEach(function (customer) { customersResult.innerHTML += `<div><strong>${customer.name}</strong><br>City: ${customer.city}</div>`; });
