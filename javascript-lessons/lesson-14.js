const customer = { id: 1, name: "Andi", city: "Dortmund" };
const jsonText = JSON.stringify(customer);
console.log(jsonText);
console.log(JSON.parse(jsonText));
