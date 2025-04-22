document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("user-table-body");
  const userCount = document.getElementById("user-count");

  // Initial state
  tableBody.innerHTML = '<tr><td colspan="2">Loading users...</td></tr>';

  console.log("Starting to fetch user logs...");
  console.log("Firestore db object available:", typeof db !== 'undefined');

  if (typeof firebase === 'undefined') {
    console.error("Firebase is not defined - check script loading order");
    tableBody.innerHTML = '<tr><td colspan="2">Error: Firebase not loaded properly</td></tr>';
    return;
  }

  if (typeof db === 'undefined') {
    console.error("Firestore db is not defined - check firebase-config.js");
    tableBody.innerHTML = '<tr><td colspan="2">Error: Database connection failed</td></tr>';
    return;
  }

  db.collection("user_logs")
    .get()
    .then(querySnapshot => {
      console.log("Query executed, got response");
      console.log("Is empty:", querySnapshot.empty);
      console.log("Size:", querySnapshot.size);

      if (querySnapshot.empty || querySnapshot.size === 0) {
        userCount.textContent = "0";
        tableBody.innerHTML = '<tr><td colspan="2">No users found</td></tr>';
        return;
      }

      userCount.textContent = querySnapshot.size;
      tableBody.innerHTML = '';

      let i = 1;
      querySnapshot.forEach(doc => {
        const email = doc.id;
        console.log(`Adding user ${i}: ${email}`);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i++}</td>
          <td><a class="user-link" href="user.html?email=${encodeURIComponent(email)}">${email}</a></td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error getting user logs:", error);
      tableBody.innerHTML = `<tr><td colspan="2">Error loading users: ${error.message}</td></tr>`;
    });
});
