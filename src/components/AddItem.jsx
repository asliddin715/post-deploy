import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({newItem, setNewItem, onSubmit}) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={onSubmit}>
      <label htmlFor='addItem'>Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id='addItem'
        type='text'
        placeholder='Add Item'
        required
        value={newItem}
        onChange={(event)=> setNewItem(event.target.value)}
      />
      <button type='submit' aria-label='Add Item'>
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
