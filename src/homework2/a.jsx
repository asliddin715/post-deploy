import { useState } from "react";
import Adder from "./c";
function Count(){
    const [count, setCount] = useState(0)

    return(
        <div>
            <h3>{count}</h3>
            <Adder count={count} setCount={setCount}/>
        </div>
    )
}

export default Count

