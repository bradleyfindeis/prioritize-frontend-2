import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListItem from "../components/ListItem";

function List() {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [listItems, setListItems] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/lists/${id}`)
      .then(response => response.json())
      .then(data => {
        setList(data.list);
        setListItems(data.list_items);
      });
  }, [id]);

  const handleAddItem = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/lists/${id}/list_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newItemName })
    })
      .then(response => response.json())
      .then(data => {
        setListItems([...listItems, data]);
        setNewItemName("");
      });
  };

  const handlePrioritize = () => {
    window.location.href = `/lists/${id}/prioritize`;
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  if (list.completed && listItems) {
    return (
      <div className="page-background">
        <div>
          <h1>{list.name}</h1>
          <h2>Priority:</h2>
          <ul>
            {listItems.map(item => (
              <li key={item.id}>{item.name} - {item.votes_count}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
  return (
    <div className="page-background">
      <div>
        <h1>{list.name}</h1>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItemName}
            onChange={(event) => setNewItemName(event.target.value)}
            placeholder="Enter new item name"
          />
          <button type="submit">Add Item</button>
        </form>
        {listItems ? listItems.map(item => (
          <ListItem key={item.id} item={item} />
        )) : null}
      </div>
      <div>
        <button onClick={handlePrioritize}>Prioritize</button>
      </div>
    </div>
  );
        }
}

export default List;