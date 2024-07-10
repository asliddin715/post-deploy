import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Count from "./homework2/a";
import MyInput from "./homework3/MyInput";

// homework 1------------------------------------------------------------------------------------------------------------------------

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`https://lesson-6-server-2.onrender.com/items`);
        if (!response.ok) {
          const textError = await response.text();
          throw new Error(`network error was not ok: ${textError}`);
        }

        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching items ", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  async function addItem() {
    const id = String(Date.now());
    const item = {
      id,
      item: newItem,
      checked: false,
    };

    try {
      const response = await fetch(`https://lesson-6-server-2.onrender.com/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok ${errorText}`);
      }
      setItems([...items, item]);
      setNewItem("");
    } catch (error) {
      console.error("Error creating new item", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const deleteItem = items.find((item) => item.id === id);
      if (!deleteItem) throw new Error("Deleted item not found");

      const response = await fetch(`https://lesson-6-server-2.onrender.com/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const textError = await response.text();
        throw new Error(`Response was not ok: ${textError}`);
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item", error.message);
      setFetchError(error.message);
    }
  }

  async function handleCheck(id) {
    try {
      const updateItem = items.find((item) => item.id === id);
      if (!updateItem) throw new Error("Update item not found");

      const response = await fetch(`https://lesson-6-server-2.onrender.com/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ checked: !updateItem.checked }),
      });

      if (!response.ok) {
        const textError = await response.text();
        throw new Error(`Response was not ok: ${textError}`);
      }

      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    } catch (error) {
      console.error("Error updating item", error.message);
      setFetchError(error.message);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    addItem();
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem newItem={newItem} setNewItem={setNewItem} onSubmit={onSubmit} />
      <SearchItem search={search} onSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;





// homework 2------------------------------------------------------------------------------------------------------------------------

// function App(){

//   return(
//     <div>
//      <Count/>
//     </div>
//   )
// }

// export default App



// homework 3-----------------------------------------------------------------------------------------------------------------------

// function App() {
//   const [text, setText] = useState(null)
//   return (
//     <div>
//       <h2>{text}</h2>
//      <MyInput value={text} setValue={setText}/>
//     </div>
//   );
// }

// export default App;



// homework 4--------------------------------------------------------------------------------------------------------------------------

// const MyInputs = ({ value, setValue }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="add">Add to Text</label>
//         <input
//           id="add"
//           type="text"
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//         />
//         <button type="submit">Add Text</button>
//       </form>
//     </div>
//   );
// };

// const Container = ({ color }) => {
//   return (
//     <div style={{ width: "300px", height:"300px", backgroundColor: `${color}` }}></div>
//   );
// };

// function App() {
//   const [color, setColor] = useState(null);
//   return (
//     <div>
//       <h2>{color}</h2>
//       <MyInputs value={color} setValue={setColor} />
//       <Container color={color} />
//     </div>
//   );
// }

// export default App;
