import Expense from "./Expense";

function ExpensesList({ expenses, setEditExpense, deleteExpense }) {
  return(
    <div className="listado-gastos contenedor">
      <h2>{expenses.length ? "Expenses" : "No expenses yet"}</h2>

      { expenses.map( expense => (
        <Expense
          key ={ expense.id}
          expense = {expense}
          setEditExpense = {setEditExpense}
          deleteExpense = {deleteExpense}
        />
      ))}
    </div>
  )
}

export default ExpensesList;