import { useState, useEffect } from 'react'
import Header from './components/Header';
import Filters from './components/Filters';
import ExpensesList from './components/ExpensesList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { generateId } from './helpers';

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [spent, setSpent] = useState(0);
  const [validBudget, setValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  // this is the all expenses array
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : []
  );

  // the object when you edit a expense
  const [editExpense, setEditExpense] = useState({})


  // FILTERS
  const [filter, setFilter] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if( Object.keys(editExpense).length > 0 ) {
      handleNewExpense();
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter) {
      // filtrando los gastos por categoria
      const filteredArray = expenses.filter( expense => expense.category === filter )
      setFilteredExpenses(filteredArray);
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;

    if(budgetLS > 0) {
      setValidBudget(true);
    }
  }, [])

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
      const totalSpent = updatedExpenses.reduce((accumulator, expense) => accumulator + expense.quantity, 0);

      if (totalSpent > budget) {
        const desicion = window.confirm("You are about to exceed your budget");

        desicion && setExpenses(updatedExpenses);
      }
      else{
        setExpenses(updatedExpenses);
      }

      setAnimateModal(false);

      setTimeout(() => {
        setModal(false); 
      }, 500)
  
      setEditExpense({});

    }
    else {
      // new
      expense.date = Date.now();
      expense.id = generateId();

      const updatedExpenses = [... expenses, expense];
      const totalSpent = updatedExpenses.reduce((accumulator, expense) => accumulator + expense.quantity, 0)

      if (totalSpent > budget) {
        const desicion = window.confirm("You are about to exceed your budget");

        desicion && setExpenses([... expenses, expense]);
      }
      else {
        setExpenses([... expenses, expense]);
      }

      setAnimateModal(false);

      setTimeout(() => {
        setModal(false); 
      }, 500)
  
      setEditExpense({});

    }

  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter( expense => expense.id !== id );
    setExpenses(updatedExpenses);
  }

  return (
    <div className={modal ? "fijar" : undefined}>
      <Header
      setSpent = {setSpent}
      spent = {spent}
      expenses = {expenses}
      setExpenses = {setExpenses}
      budget = {budget}
      setBudget = {setBudget}
      validBudget = {validBudget}
      setValidBudget = {setValidBudget}
      />

      { validBudget &&
        <>
          <main>

            <Filters 
            filter = {filter}
            setFilter = {setFilter}
            />

            <ExpensesList
              expenses = {expenses}
              setEditExpense = {setEditExpense}
              deleteExpense = {deleteExpense}
              filter = {filter}
              filteredExpenses = {filteredExpenses}
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

      <Footer/>
    </div>
  )
}

export default App
