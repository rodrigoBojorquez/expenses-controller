import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function BudgetControl({ budget, expenses }) {

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);
    const [percentage, setPersentage] = useState(100);
    const [pathColor, setPathColor] = useState("");
    const [textColor, setTextColor] = useState("");

    useEffect(() => {
      const totalSpent = expenses.reduce( (total, expense) => {
        return total + expense.quantity
      }, 0)

      const totalAvailable = budget - totalSpent;

      // calcular el porcentaje de la grafica
      const newPercentage = ((totalAvailable * 100 / budget)).toFixed(2);

      setSpent(totalSpent);
      setAvailable(totalAvailable); 

      setTimeout(()=> {
        setPersentage(newPercentage);

        if (newPercentage >= 66.66){
            setPathColor("#64CC45");
            setTextColor("#64CC45");
          }
        else if(newPercentage >= 33.33) {
            setPathColor("#E2E057");
            setTextColor("#E2E057");
        }
        else {
            setPathColor("#EB4848");
            setTextColor("#EB4848");
        }
      }, 700)


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
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: pathColor,
                    textColor: textColor,
                    trailColor: "#f5f5f5"
                })}
                value={percentage}
                text={`${percentage}% Available`}
                />
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