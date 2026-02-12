import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import SpecialArea from './components/SpecialArea'

function App() {
  

  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <SpecialArea />
    </>
  )
}

export default App
