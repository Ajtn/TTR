import { useState, useEffect } from 'react';
import FilterTable from "./components/FilterTable";
//import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <FilterTable />
    </div>
  )
}

export default App
