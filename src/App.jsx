import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import SpecialArea from './components/SpecialArea'
import StatsSection from './components/StatsSection'
import InfoSection from './components/InfoSection'
import ExperienceSection from './components/ExperinceSection'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <SpecialArea />
      <StatsSection />
      <InfoSection />
      <ExperienceSection />
      <Footer />
    </>
  )
}

export default App
