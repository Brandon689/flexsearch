const { Index } = require("flexsearch");
const fs = require("fs");
const index = new Index();

const documents = [
  { id: 1, text: 'Introduction to FlexSearch' },
  { id: 2, text: 'Getting started with Node.js' },
  { id: 3, text: 'FlexSearch usage examples' },
  { id: 4, text: 'Node.js best practices' }
];

documents.forEach(doc => index.add(doc.id, doc.text));

function search(query) {
  return index.search(query);
}

const query = 'FlexSearch examples';
const results = search(query);
console.log(`Search results for '${query}':`, results);

const keys = [];

index.export((key, data) => {
  const filePath = `index_${key}.json`;
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log(`Index part '${key}' saved to disk.`);
  
  keys.push(key);
});

keys.forEach(key => {
  const filePath = `index_${key}.json`;
  const data = JSON.parse(fs.readFileSync(filePath));
  index.import(key, data);
  console.log(`Index part '${key}' imported.`);
});
