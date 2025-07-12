import { useState } from 'react'
import Navbar from './Components/Navbar'
import hero from './Components/hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-black">
      <Navbar />
      <hero />
    </div>

  )
}

export default App
