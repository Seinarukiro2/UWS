import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material'; // Example using MUI

const DatabaseTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/tables/') // Adjust to your backend URL
      .then(response => {
        setTables(response.data.tables);
      })
      .catch(error => {
        console.error("There was an error fetching the tables!", error);
      });
  }, []);

  return (
    <div>
      <h1>Database Tables</h1>
      <List>
        {tables.map((table, index) => (
          <ListItem key={index}>
            <ListItemText primary={table} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DatabaseTables;
