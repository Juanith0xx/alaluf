import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyDetail from "../components/PropertyDetail"; // Ajusta la ruta si es necesario

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Usamos tu ruta de backend que ya maneja ID y Código
        const response = await fetch(`${API_URL}/api/propiedades/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error al cargar la ficha:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#24B6C1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property || property.error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center p-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Propiedad no encontrada</h2>
          <p className="text-gray-500">El código {id} no existe o no está disponible actualmente.</p>
        </div>
      </div>
    );
  }

  return <PropertyDetail property={property} />;
};

export default PropertyPage;