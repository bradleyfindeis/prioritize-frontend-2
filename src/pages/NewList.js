import React, { useState } from 'react';

function NewList() {
  const [title, setTitle] = useState('');
  const [listItems, setListItems] = useState([]);

  const updateTitle = (event) => {
    setTitle(event.target.value);
  };

  const updateListItemName = (event, index) => {
    const newListItems = [...listItems];
    newListItems[index].name = event.target.value;
    setListItems(newListItems);
  }

  const addNewListItem = () => {
    const newListItems = [...listItems];
    newListItems.push({
      name: '',
    });
    setListItems(newListItems);
  };

  const handleSave = () => {
    const body = {
      name: title,
      items: listItems
    };

    const userId = parseInt(document.cookie.match(/(^|;) user_id=([^;]+)/)[2]);
    debugger;
    fetch(`http://localhost:3000/lists?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(() => {
      debugger;
      window.location.href = '/lists';
    });
  };

  return (
    <div className="page-background">
      <div className="new-list-form">
        <h1 className="page-title">New List</h1>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            name="name"
            id="name"
            type="text"
            onChange={updateTitle}>
          </input>
        </div>
        {listItems.map((item, index) => (
          <div className="form-row" key={index}>
            <label htmlFor="name">Item Name</label>
            <input
              className="input"
              name="name"
              id="name"
              type="text"
              onChange={(e) => updateListItemName(e, index)}>
            </input>
          </div>
        ))}
        <div className="create-new-button" onClick={addNewListItem}>New List Item</div>
        <div className="create-new-button" onClick={handleSave}>Create List</div>
      </div>
    </div>
  )
}

export default NewList;