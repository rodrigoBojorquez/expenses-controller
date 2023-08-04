import Message from "./Message";
import { useState } from "react";

function NewBudget({ budget, setBudget, setValidBudget }) {

  const [message, setMessage] = useState("");

  const handleBudget = (e) => {
    e.preventDefault();

    if( budget <= 0 || !budget ) {
      setMessage("Enter a valid budget");
      return
    }
    
    setMessage("");
    setValidBudget(true);

  }

  return(
    <div className="contenedor-presupuesto contenedor sombra">

      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label htmlFor="">Set budget</label>
          <input 
            id="budget-input"
            type="number" 
            className="nuevo-presupuesto" 
            placeholder="0" 
            onChange={ (e)=> setBudget(+e.target.value) }  
          />
        </div>

        <input type="submit" value="Set"/>

        {message && <Message type="error"> {message} </Message>}
      </form>

    </div>
  )
}

export default NewBudget;