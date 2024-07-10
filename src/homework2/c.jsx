
function Adder({ setCount, count }) {
  return (
    <div>
      <button onClick={()=>{
        setCount(count + 1)
      }}>Icrement</button>
      
      <button onClick={()=>{
        setCount(count - 1)
      }}>Decrement</button>

      <button onClick={()=>{
        setCount(0)
      }}>Reset</button>
    </div>
  );
}
export default Adder