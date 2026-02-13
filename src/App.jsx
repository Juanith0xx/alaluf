import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import SpecialArea from './components/SpecialArea'
import StatsSection from './components/StatsSection'

function App() {
  

  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <SpecialArea />
      <StatsSection />
    </>
  )
}

export default App
