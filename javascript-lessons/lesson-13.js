const customers = [{ id: 1, name: "Andi" }, { id: 2, name: "Sara" }];
const index = customers.findIndex(function (item) { return item.id === 1; });
if (index !== -1) { customers.splice(index, 1); }
console.log(customers);
