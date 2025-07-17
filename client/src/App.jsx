import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hotel from './Components/Hotel/Hotel'

import Header from './Components/Header/Header'
import Growth from './Components/Growth/Growth'
import Inquire from './Components/Inquire/Inquire'
import Footer from './Components/Footer/Footer'
function App() {
 

  return (
    <>

      <div>
       <Header/>
       <Hotel/>
       <Growth/>
       <Inquire/>
        <Footer/>
      </div>
    </>
  )
}

export default App
