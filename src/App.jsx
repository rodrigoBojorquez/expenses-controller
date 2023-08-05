import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpensesList from './components/ExpensesList';
import Modal from './components/Modal';
import { generateId } from './helpers';

function App() {

  const [budget, setBudget] = useState(0);
  const [validBudget, setValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  // this is the all expenses array
  const [expenses, setExpenses] = useState([])

  // the object when you edit a expense
  const [editExpense, setEditExpense] = useState({})

  useEffect(() => {
    if( Object.keys(editExpense).length > 0 ) {
      handleNewExpense();
    }
  }, [editExpense])

  const handleNewExpense = () => {
    setModal(true);

    setTimeout(() => {
      setAnimateModal(true);
    }, 200)
  }

  const saveExpense = (expense) => {
    if(expense.id) {
      // update 
      const updatedExpenses = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState );
      setExpenses(updatedExpenses);
    }
    else {
      // new
      expense.date = Date.now();
      expense.id = generateId();
      setExpenses([... expenses, expense]);
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false); 
    }, 500)

  }

  return (
    <div className={modal ? "fijar" : undefined}>
      <Header
      expenses = {expenses}
      budget = {budget}
      setBudget = {setBudget}
      validBudget = {validBudget}
      setValidBudget = {setValidBudget}
      />

      { validBudget &&
        <>
          <main>
            <ExpensesList
              expenses = {expenses}
              setEditExpense = {setEditExpense}
            />
          </main>
          <div className='nuevo-gasto'>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="icon icon-tabler icon-tabler-circle-plus" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="white" fill="#00abfb" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              onClick={handleNewExpense}
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l6 0" />
              <path d="M12 9l0 6" />
            </svg>
          </div>
        </>
      }

      {modal && 
        <Modal  
        setModal = {setModal}
        setAnimateModal = {setAnimateModal}
        animateModal = {animateModal}
        saveExpense = {saveExpense}
        editExpense = {editExpense}
        setEditExpense = {setEditExpense}
        />
      }
    </div>
  )
}

export default App
