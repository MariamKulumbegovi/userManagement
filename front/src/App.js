import { useState } from 'react'
import './App.css'
import { MainPage } from './components/Main/MainPage'
import { Router } from './router/Router'
function App() {
  const [updateList,setUpdateList]=useState(false)
  return (
    <div className='App'>
      <MainPage updateList={updateList} />
      <Router updateList={updateList} setUpdateList={setUpdateList} />
    </div>
  )
}

export default App
