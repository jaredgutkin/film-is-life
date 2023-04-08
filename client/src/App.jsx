import { useState } from 'react'
import MainLayout from './components/layout/MainLayout.jsx';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainLayout />
    </div>
  )
}

export default App;
