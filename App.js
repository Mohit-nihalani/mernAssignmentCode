import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

 const [operands,setOperands] = useState([])

 const [operators,setOperators] = useState([])
 
useEffect(()=>{
  axios.get('http://localhost:3030/').then((result)=>{
    setOperands(result.data[0].operands); 
    setOperators(result.data[1].operators)
  })
 },[])
 
  const [dropData,setDropData] = useState([]);

  const onDragOver = (e)=>{
    e.preventDefault()
  }

  const onDragStart = (e,id)=>{
    console.log(id);
    e.dataTransfer.setData("id",id)
  }

  const onDrop = (e)=>{
    const dropDataItem = e.dataTransfer.getData("id");
    setDropData((prevData)=>{
      return [...prevData,dropDataItem]
    })
  }

const handleEval = (e)=>{
  e.preventDefault();
  const cal = dropData.join("");
  alert(eval(cal))
}

const handleClose=(e,item)=>{
  e.preventDefault();
  setDropData((prevData)=>{
    return prevData.filter((removeItem)=>{
      return removeItem !== item
    })
  })
}

const handleLess=()=>{
  setDropData((prevData)=>{
    return [...prevData,"<"]
  })
}
const handleGreat=()=>{
  setDropData((prevData)=>{
    return [...prevData,">"]
  })
}

const handleRHS = ()=>{
  const inputNum = prompt();
  setDropData((prevData)=>{
    return [...prevData,inputNum]
  })

}

  return (
    <div className="App container">
      <div className="row operatorContainer mt-3">
      <h3>Operands</h3>
       {operands.map(operand=>{
        return (<div key={operand.name} onDragStart={(e)=>{onDragStart(e,operand.value)}}
         value={operand.value} draggable className="col operator">
         {operand.name}
         </div>)
       })}
      </div>
      <div className="row operandContainer mt-2">
        <h3>Operators</h3>
       {operators.map((operator)=>{
        return <div key={operator.name}
         draggable onDragStart={(e)=>{onDragStart(e,operator.value)}}
         className='col operand'>{operator.value}</div>
       })}
       <div onClick={handleLess} className='col operand'>{"<"}</div>
       <div onClick={handleGreat} className='col operand'>{">"}</div>
       <div onClick={handleRHS} className='col operand'>RHS integer</div>
      </div>
      <h3 className=' mt-2'>Drop</h3>
      <div className='row dropContainer' onDrop={(e=>{onDrop(e,'val')})} onDragOver={(e)=>{onDragOver(e)}}>
       {dropData.map((dropItem)=>{ 
        return <div key={dropItem}  className='col-3 dItems'>{dropItem}<span className='closeBtn' onClick={(e)=>{handleClose(e,dropItem)}}>x</span></div>
       })}
      </div>
      <button className='w-100 btn btn-primary mt-1' onClick={(e)=>{handleEval(e)}}>Eval</button>
    </div>
  );
}

export default App;
