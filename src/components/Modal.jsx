import BtnClose from "../img/cerrar.svg";
import { useState, useEffect } from "react";
import Message from "./Message";

function Modal({ setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense}) {

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if( Object.keys(editExpense).length > 0 ) {
      setName(editExpense.name);
      setQuantity(editExpense.quantity);
      setCategory(editExpense.category);
      setDate(editExpense.date);
      setId(editExpense.id);
    }
  }, [])

  const hiddenModal = () => {
    setAnimateModal(false);

    setTimeout(() => {
      setModal(false); 
    }, 500)

    setEditExpense({});
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();

    if([name, category].includes("") || quantity <= 0) {
        setMessage("All fields are required");

        setTimeout( () => {
            setMessage("");
        }, 3000)
        return
    }
    setMessage("");
    saveExpense({ name, quantity, category, date, id })
  }

  return(
    <div className="modal">
      <div className="cerrar-modal">
        <img src={BtnClose} alt="Close" onClick={hiddenModal} />
      </div>

      {/* asi pongo clases de forma condicional */}
      <form className={`formulario ${animateModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
        <legend>{editExpense.name ? "Edit Expense" : "New expense"}</legend>

        { message && <Message type="error">{message}</Message> }

        <div className="campo">
          <label htmlFor="name">New of expense</label>
          <input 
            id="name"
            type="text"
            placeholder="Add the name of the expense"
            value={name}
            onChange={ e => setName(e.target.value)} 
          />
        </div>

        <div className="campo">
          <label htmlFor="quantity">Quantity</label>
          <input 
            id="quantity"       
            value={quantity === 0 ? "" : quantity}
            type="number"
            step="any"
            placeholder="Add the quantity of the expense"
            onChange={ e => setQuantity(+e.target.value) } 
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">-- Select one --</option>
            <option value="save">Save</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="others">Others</option>
          </select>
        </div>

        <input 
        type="submit"
        value={editExpense.name ? "Save changes" : "Add expense"}
        />
      </form>
    </div>
  )
}

export default Modal;