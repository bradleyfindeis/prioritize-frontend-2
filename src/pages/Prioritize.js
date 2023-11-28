import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompareButton from "../components/CompareButton";
import SaveButton from "../components/SaveButton";

const Prioritize = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [priority, setPriority] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [comparedAll, setComparedAll] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/lists/${id}/list_items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  useEffect(() => {
    let counts = {};
    priority.forEach(function (x) {
      counts[x.id] = (counts[x.id] || 0) + 1;
    });
    let sorted = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a];
    });
    let sortedItems = [];
    sorted.forEach((id) => {
      let item = items.find((item) => item.id == id);
      item.votes = counts[id];
      sortedItems.push(item);
    });
    debugger;
    setSorted(sortedItems);
  }, [priority]);

  const handleCompare = (winner) => {
    setPriority([...priority, winner]);
    if (index2 < items.length -1) {
      if (index1 === index2 + 1) {
        if (index1 === items.length - 1) {
          setComparedAll(true);
        } else {
          setIndex2(index2 + 2);
        }
      } else {
        setIndex2(index2 + 1);
      }
    } else if (index1 < items.length) {
      setIndex1(index1 + 1);
      setIndex2(0);
    }
    else if (index1 === items.length - 1) {
      setComparedAll(true);
    }
  };

  const onSave = () => {
    fetch(`http://localhost:3000/lists/${id}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sorted: sorted, completed: comparedAll }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          alert(data.message);
          window.location.href = `/lists/${id}`;
        }
      });
  };


  if (!items) {
    return <div>Loading...</div>;
  } else {
    if (!comparedAll) {
      return (
        <div className="page-background">
          <div className="title-container">
            <h2>Compare Items</h2>
          </div>
          <div className="comparison-container">
            <div className="comparison-item">
              <CompareButton item={items[index1]} onCompare={handleCompare} />
              <CompareButton item={items[index2]} onCompare={handleCompare} />
            </div>
          </div>
          <div className="priority-container">
            <h2>Priority:</h2>
            <ul className="priorities-list">
              {sorted.map((item, index) => (
                <li key={index}>{item.name} - {item.votes}</li>
              ))}
            </ul>
          </div>          
        </div>
      );
    } else {
       return (
        <div className="page-background">
        <div className="priority-container">
          <h2>Priority:</h2>
          <ul className="priorities-list">
            {sorted.map((item, index) => (
              <li key={index}>{item.name} - {item.votes}</li>
            ))}
          </ul>
        </div>
        { comparedAll ? <SaveButton handleSave={onSave} /> : null}
        
      </div>
       )
      }
  }



  // return (
  //   <div className="page-background">
  //     <div className="title-container">
  //       <h2>Compare Items</h2>
  //     </div>
  //     <div className="button-container">
  //       <Comparison items={items} onCompare={handleCompare} />
  //     </div>
  //     <div className="priority-container"></div>
  //   </div>
  // );
}

export default Prioritize;
