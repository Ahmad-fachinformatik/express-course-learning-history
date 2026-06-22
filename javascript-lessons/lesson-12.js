const customers = [{ id: 1, name: "Andi" }, { id: 2, name: "Sara" }];
const customer = customers.find(function (item) {
  return item.id === 2;
});
console.log(customer);
