import React from 'react';
import '../styles/main.css';
import ListCard from '../components/ListCard';
import { useState, useEffect } from 'react';
import AddNewListButton from '../components/AddNewListButton';

function Lists() {
  // const dateTime = new Date();
  // const formattedDateTime = dateTime.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');
  const [lists, setList] = useState(null);

  // const getCSRFToken = () => {
  //   const csrfToken = document.cookie.match(/(^|;) CSRF-TOKEN=([^;]+)/);
  //   return csrfToken ? csrfToken[2] : '';
  // };

  useEffect(() => {
    const userId = parseInt(document.cookie.match(/(^|;) user_id=([^;]+)/)[2]);
    fetch(`http://localhost:3000/lists?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        
        setList(data.lists);
      });
  }, []);

  if (!lists) {
    return <div>Loading...</div>;
  }

  if (lists.length === 0) {
    return (
      <div className="page-background center-stuffs">
        <h1 className="page-title">Lists</h1>
        <p>No lists yet. Add a new list.</p>
        <AddNewListButton />
      </div>
    );
  }


  return (
    <div className="page-background center-stuffs">
        <h1 className="page-title">Lists</h1>
        {lists.map(list => (
          <div className="list-card">
            <ListCard key={list.id} item={list} />
          </div>
        ))
      }
      <AddNewListButton />
    </div>
  );
}

export default Lists;