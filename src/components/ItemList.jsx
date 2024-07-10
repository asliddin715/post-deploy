import React from "react";

const ItemList = ({ items, handleDelete, handleCheck }) => {
  return (
    <ul style={{marginTop:"20px"}}>
      {items.map((item) => (
        <li key={item.id} style={{display:"flex", justifyContent:"space-around", alignItems:"center",}}>
          <input
            type="checkbox"
            style={{}}
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
          <label
            style={{ textDecoration: item.checked ? "line-through" : "none" }}
          >
            {item.item}
          </label>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
