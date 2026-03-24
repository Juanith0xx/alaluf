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
import Residencial from './pages/Residencial';
import AdministracionActivo from './pages/AdministracionActivo';
import TasacionActivos from './pages/TasacionActivo';
import ClubDealsInversiones from './pages/ClubDealsInversiones';
import ScrollToTop from './components/ScrollToTop';
import Nosotros from './pages/Nosotros';


function App() {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path="/residencial" element={<Residencial />} />
        <Route path="/administracion-activo" element={<AdministracionActivo />} />
        <Route path="/tasacion-activo" element={<TasacionActivos />} />
        <Route path="/club_deals_inversiones" element={<ClubDealsInversiones/>} />
        <Route path="/nosotros" element={<Nosotros/>} />



      </Routes>
      <Footer />
      <WhatsAppBubble />
    </Router>
  );
}

export default App;