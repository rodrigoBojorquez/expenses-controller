import { useState, useEffect } from "react"

function Filters({ filter, setFilter }) {
  return(
    <div className="filtros sombra contenedor">
      <form action="">
        <div className="campo">
          <label htmlFor="filter-expenses">Filter expenses</label>
          <select 
            id="filter-expenses" 
            value={filter}
            onChange={e => setFilter(e.target.value)}    
        >
            <option value="">-- All categories --</option>
            <option value="save">Save</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="others">Others</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filters;