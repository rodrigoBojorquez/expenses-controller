import { useState, useEffect } from "react";

function BudgetControl({ budget, expenses }) {

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);

    useEffect(() => {
      const totalSpent = expenses.reduce( (total, expense) => {
        return total + expense.quantity
      }, 0)

      const totalAvailable = budget - totalSpent

      setSpent(totalSpent);
      setAvailable(totalAvailable); 
    }, [expenses])
    

    //   formatea el numero a moneda
    const formatQuantity = (quantity) => {
        return quantity.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Grafica aqui</p>
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Budget: </span>{formatQuantity(budget)}
                </p>

                <p>
                    <span>Available: </span>{formatQuantity(available)}
                </p>

                <p>
                    <span>Spent: </span>{formatQuantity(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl;