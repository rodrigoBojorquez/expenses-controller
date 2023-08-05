import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css"

import { formatDate } from "../helpers";

import SaveIcon from "../img/icono_ahorro.svg";
import HomeIcon from "../img/icono_casa.svg";
import FoodIcon from "../img/icono_comida.svg";
import OthersIcon from "../img/icono_gastos.svg";
import LeisureIcon from "../img/icono_ocio.svg";
import HealthIcon from "../img/icono_salud.svg";
import SubscriptionsIcon from "../img/icono_suscripciones.svg";

const iconDictionary = {
  save : SaveIcon,
  home : HomeIcon,
  food : FoodIcon,
  others : OthersIcon,
  leisure : LeisureIcon,
  health : HealthIcon,
  subscriptions : SubscriptionsIcon
}

const testing = ()=> console.log("funciona el swipe");

function Expense({expense, setEditExpense}) {


  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={()=> setEditExpense(expense)}>
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={()=> console.log("delete")}>
        Delete
      </SwipeAction>
    </TrailingActions>
  )

  return(
    <SwipeableList>
      <SwipeableListItem
        leadingActions = {leadingActions()}
        trailingActions = {trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            {/* aqui va la imagen */}
            <img src={iconDictionary[expense.category]} alt="Category icon" />
            <div className="descripcion-gasto">
                <p className="categoria">{expense.category}</p>
                <p className="nombre-gasto">{expense.name}</p>
                <p className="fecha-gasto">Added on: <span>{formatDate(expense.date)}</span></p>
            </div>
          </div> 

          <p className="cantidad-gasto">{expense.quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense;