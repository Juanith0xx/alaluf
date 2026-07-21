import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/Navbar';
import './App.css';

import Hero from './components/Hero';
import SpecialArea from './components/SpecialArea';
import StatsSection from './components/StatsSection';
import InfoSection from './components/InfoSection';
import ExperienceSection from './components/ExperinceSection';

import Licitaciones from './pages/Licitaciones';
import Industrial from './pages/Industrial';
import Comercial from './pages/Comercial';
import Residencial from './pages/Residencial';
import AdministracionActivo from './pages/AdministracionActivo';
import TasacionActivos from './pages/TasacionActivo';
import ClubDealsInversiones from './pages/ClubDealsInversiones';
import Nosotros from './pages/Nosotros';
import TasaPropiedad from './pages/TasaPropiedad';
import TerrenoProyecto from './pages/TerrenosProyecto';

import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import ScrollToTop from './components/ScrollToTop';

// Meta Pixel
import MetaPixelTracker from './components/MetaPixelTracker';

// Vistas de búsqueda y detalle
import SearchView from './pages/SearchView';
import PropertyPage from './pages/PropertyPage';

// Simulador hipotecario
import MortgageCalculator from './pages/MortgageCalculator';

// Formulario de publicación
import Vender from './pages/PublishPropertyForm';
import ContactForm from './components/ContacForm';

function App() {
  return (
    <ToastProvider>
      <Router>
        <MetaPixelTracker />

        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <SpecialArea />
                <StatsSection />
                <InfoSection />
                <ExperienceSection />
              </>
            }
          />

          <Route path="/buscar" element={<SearchView />} />
          <Route path="/propiedad/:id" element={<PropertyPage />} />

          <Route
            path="/simulador-hipotecario"
            element={<MortgageCalculator />}
          />

          <Route
            path="/tasa-propiedad"
            element={<TasaPropiedad />}
          />

          <Route
            path="/vender"
            element={
              <div className="pt-16">
                <Vender />
              </div>
            }
          />

          <Route path="/licitaciones" element={<Licitaciones />} />
          <Route path="/industrial" element={<Industrial />} />

          <Route
            path="/terrenos_proyectos"
            element={<TerrenoProyecto />}
          />

          <Route path="/comercial" element={<Comercial />} />
          <Route path="/residencial" element={<Residencial />} />

          <Route
            path="/administracion-activo"
            element={<AdministracionActivo />}
          />

          <Route
            path="/tasacion-activo"
            element={<TasacionActivos />}
          />

          <Route
            path="/club_deals_inversiones"
            element={<ClubDealsInversiones />}
          />

          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<ContactForm />} />
        </Routes>

        <Footer />
        <WhatsAppBubble />
      </Router>
    </ToastProvider>
  );
}

export default App;