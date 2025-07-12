import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import Hero from './components/Hero'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-black">
      <Navbar />
      <Hero/>
    </div>

  )
}

export default App
