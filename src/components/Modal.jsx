import BtnClose from "../img/cerrar.svg";
import { useState } from "react";
import Message from "./Message";

function Modal({ setModal, animateModal, setAnimateModal }) {

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const hiddenModal = () => {
    setAnimateModal(false);

    setTimeout(() => {
      setModal(false); 
    }, 500)
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
  }

  return(
    <div className="modal">
      <div className="cerrar-modal">
        <img src={BtnClose} alt="Close" onClick={hiddenModal} />
      </div>

      {/* asi pongo clases de forma condicional */}
      <form className={`formulario ${animateModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
        <legend>New expense</legend>

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
            type="number"
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
        value="Add expense"
        />
      </form>
    </div>
  )
}

export default Modal;