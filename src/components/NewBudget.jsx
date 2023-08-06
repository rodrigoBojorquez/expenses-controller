import Message from "./Message";
import { useState } from "react";

function NewBudget({ budget, setBudget, setValidBudget }) {

  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState(false);

  const handleBudget = (e) => {
    e.preventDefault();

    if( budget <= 0 || !budget ) {
      setMessage("Enter a valid budget");
      return
    }
    else if(budget > 10000000000) {
      setMessage("The budget is too large");
      return
    }
    
    setMessage("");
    setValidBudget(true);

  }

  const handleFocus = () => {
    setPlaceholder(true);
  }

  const handleBlur = () => {
    setPlaceholder(false);
  }

  return(
    <div className="contenedor-presupuesto contenedor sombra">

      <form onSubmit={handleBudget} className="formulario">
        <div className="campo">
          <label htmlFor="">Set budget</label>
          <input 
            id="budget-input"
            type="number" 
            step="any"
            className="nuevo-presupuesto" 
            placeholder={placeholder ? "" : "0"}
            onFocus={handleFocus}
            onBlur={handleBlur}
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