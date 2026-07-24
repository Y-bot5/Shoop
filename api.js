const request = indexedDB.open('TaskDatabase', 1);

let db;

request.onupgradeneeded = (event) => {
  db = event.target.result;
  
  const store = db.createObjectStore('tasks', { keyPath: 'id' });
  
  store.createIndex('by_category', 'category', { unique: false });
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log('Database successfully connected.');
};

request.onerror = (event) => {
  console.error('Database connection failed:', event.target.error);
};
