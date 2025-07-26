
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Exchanges from './components/Exchanges'
import Coins from './components/Coins'
import CoinsDetails from './components/CoinsDetails'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Exchanges/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/coins/:coinId' element={<CoinsDetails/>}/>
      </Routes>
      
    </>
  )
}

export default App
