import NewBudget from "./NewBudget";
import BudgetControl from "./BudgetControl";

function Header({ budget, setSpent, setExpenses, spent, setBudget, validBudget, setValidBudget, expenses }) {
  return(
    <header>
      <h1>Expenses Controller</h1>

      { validBudget ? 
        <BudgetControl
        setSpent = {setSpent}
        spent = {spent}
        setExpenses = {setExpenses}
        budget = {budget}
        setBudget = {setBudget}
        expenses = {expenses}
        setValidBudget = {setValidBudget}
        />
        :
        <NewBudget
        budget = {budget}
        setBudget = {setBudget}
        setValidBudget = {setValidBudget}
        />
      }
    </header>
  )
}

export default Header;