import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Initialize the database
export const putDb = async (content) => {
console.log('PUT to the database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
// Access the 'jate' object store
const store = tx.objectStore('jate');
// Put the content into the store with ID 1
const request = store.put({ id: 1, value: content });
// Wait for the request to complete
const result = await request;
console.log('result.value', result);
return result;
};

// TODO: Add logic for a method that gets all the content from the database
// Retrieve data from the database
export const getDb = async () => {
console.log('GET from the database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
// Access the 'jate' object store
const store = tx.objectStore('jate');
// Get the content from the store with ID 1
const request = store.get(1);
const result = await request;
console.log('result.value', result.value);
return result.value;
};

// Initialize the database
initdb();
