let db;
const request = indexedDB.open("budget",1)

 request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", {autoIncrement:true});
};

 request.onsuccess = function (event) {
  const db = event.target.result;
  
  if(navigator.onLine) {
      checkDatabase();
  }
};

 function saveRecord(event) {
  const transaction = db.transaction(["pending"],"readwrite");
  const store = transaction.objectStore("pending");

  store.add(record);
};


 function checkDatabase() {
  const transaction = db.transaction(["pending"],"readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function (){
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(transaction),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
         
      }
  }
};


