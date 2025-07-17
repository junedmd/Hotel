import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Dummy from './Pages/Dummy/Dummy.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path={"/"} element={<App/>}/> 
    <Route path={"/contact"} element={<Contact/>} />
    <Route path={"/about"} element={<Dummy/>} />
  </Routes>
  </BrowserRouter>
)
