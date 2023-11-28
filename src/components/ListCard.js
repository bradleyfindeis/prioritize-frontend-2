import React from 'react';
import '../styles/main.css';

function ListCard({ item }) {

  const handleClick = () => {
    window.location.href = `/lists/${item.id}`;
  };

  return (
    <div onClick={handleClick}>
      <div className="list-card-item">
        <h2 className="list-card-title">{item.name}</h2>
        <p className="list-card-date">{item.created_at}</p>
      </div>
    </div>
  );
}

export default ListCard;