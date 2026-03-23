import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import SpecialArea from './components/SpecialArea';
import StatsSection from './components/StatsSection';
import InfoSection from './components/InfoSection';
import ExperienceSection from './components/ExperinceSection';
import Licitaciones from './pages/Licitaciones';
import Industrial from './pages/Industrial';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import Comercial from './pages/Comercial';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* PAGINA PRINCIPAL */}
        <Route path="/" element={
          <>
            <Hero />
            <SearchBar />
            <SpecialArea />
            <StatsSection />
            <InfoSection />
            <ExperienceSection />
          </>
        } />

        {/* PAGINA DE LICITACIONES */}
        <Route path="/licitaciones" element={<Licitaciones />} />
        <Route path="/industrial" element={<Industrial />} />
        <Route path="/comercial" element={<Comercial />} />

      </Routes>
      <Footer />
      <WhatsAppBubble />
    </Router>
  );
}

export default App;