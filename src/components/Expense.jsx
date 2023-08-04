import { formatDate } from "../helpers";

function Expense({expense}) {

  return(
    <div className="gasto sombra">
      <div className="contenido-gasto">
        {/* aqui va la imagen */}
        <div className="descripcion-gasto">
            <p className="categoria">{expense.category}</p>
            <p className="nombre-gasto">{expense.name}</p>
            <p className="fecha-gasto">Added on: <span>{formatDate(expense.date)}</span></p>
        </div>
      </div> 

      <p className="cantidad-gasto">{expense.quantity}</p>
    </div>
  )
}

export default Expense;