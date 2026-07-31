const userRequest = indexedDB.open('Users', 1);
const idRequest = indexedDB.open('UserID', 1);

let userdb, iddb, userSafeToOpen, idSafeToOpen;

idRequest.onupgradeneeded = (event) => {
  iddb = event.target.result;

  const id = iddb.createObjectStore('id', { keyPath: 'id' });

  id.createIndex('by_id', 'id', { unique: true });
};

userRequest.onupgradeneeded = (event) => {
  userdb = event.target.result;

  const users = userdb.createObjectStore('users', { keyPath: 'id' });

  users.createIndex('by_email', 'email', { unique: true });
};

userRequest.onsuccess = (event) => {
  userdb = event.target.result;
  userSafeToOpen = true;
  console.log('Database successfully connected.');
};

idRequest.onsuccess = (event) => {
  iddb = event.target.result;
  idSafeToOpen = true;
  console.log('ID Database successfully connected.');
};

userRequest.onerror = (event) => {
  console.error('Database connection failed:', event.target.error);
};

idRequest.onerror = (event) => {
  console.error('ID Database connection failed:', event.target.error);
};

function incrementID(callback) {
  if (!idSafeToOpen) {
    setTimeout(() => incrementID(callback), 100);
    return;
  }

  const transaction = iddb.transaction('id', 'readwrite');
  const idStore = transaction.objectStore('id');
  let IDToReturn = 0;

  const openCursorRequest = idStore.openCursor(null, 'prev');

  openCursorRequest.onsuccess = (event) => {
    const currentID = event.target.result ? event.target.result.value.id : 0;
    IDToReturn = currentID + 1;

    idStore.put({ id: IDToReturn });
    idStore.delete(currentID);

    callback(IDToReturn);
  };
}

function addUserToDB(email, name) {
  if (!userSafeToOpen) {
    setTimeout(() => addUserToDB(email, name), 100);
    return;
  }
  incrementID((id) => {
    const transaction = userdb.transaction(['users'], 'readwrite');
    const users = transaction.objectStore('users');

    const user = { email: email, userName: name, id: id };
    const userRequest = users.put(user);

    userRequest.onsuccess = () => {
      console.log('Data saved successfully.');
    };
  })
}

setTimeout(() => addUserToDB("y-bot5@hotmail.com", "Shoop"), 5);