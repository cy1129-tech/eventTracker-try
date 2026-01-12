import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './shadcn/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant='default'
      >Hello ShadCn</Button>
    </>
  )
}

export default App
