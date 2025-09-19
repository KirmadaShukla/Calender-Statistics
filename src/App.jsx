import { useState } from 'react'
import CalendarView from './Components/CalendarView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CalendarView/>
    </>
  )
}

export default App
