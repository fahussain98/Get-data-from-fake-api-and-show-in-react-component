import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [user, setUser] = useState(null); // State to hold a single user by ID
  const [loading, setLoading] = useState(false); // Loading state for both fetching
  const [error, setError] = useState(null); // Error state for both fetching
  const [fetchUserById, setFetchUserById] = useState(false); // State to trigger fetching user by ID
  const [id, setId] = useState(""); // State to hold the ID input

  // Fetch list of users
  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products/")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fetch user by ID when fetchUserById state changes
  useEffect(() => {
    if (fetchUserById) {
      setLoading(true);
      axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(response => {
          setUser(response.data);
          setError(null);
        })
        .catch(error => {
          setError(error.message);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
          setFetchUserById(false); // Reset fetchUserById to avoid refetching on every render
        });
    }
  }, [fetchUserById, id]);

  return (
    <div className="App">
      <h1>Fake API Demo</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        <h2>Products List</h2>
        <ul>
          {/* {users.map(user => (
            <li key={user.id}>
              {user.title} - ${user.price}
              - {user.category} - {user.description}
            </li>
          ))} */}
        </ul>
      </div>

      <div>
        <h2>Fetch Product by ID</h2>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
        />
        <button onClick={() => setFetchUserById(true)}>Fetch Data</button>
        
        {user && (
          <div className="card">
            <h2>{user.title?.toUpperCase()}</h2>
            <p>${user.price}</p>
            <p>{user.category}</p>
            <p>{user.description}</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default App;























// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Optional, you can use fetch API

// const ApiDemo = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from the fake API
//     axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(response => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });

//     // Fetch API alternative:
//     // fetch('https://jsonplaceholder.typicode.com/users')
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     setUsers(data);
//     //     setLoading(false);
//     //   })
//     //   .catch(error => {
//     //     setError(error);
//     //     setLoading(false);
//     //   });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h1>Users List</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ApiDemo;
