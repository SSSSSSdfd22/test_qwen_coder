import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Home() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`);
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12 px-4">
      <nav className="max-w-6xl mx-auto mb-8">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-blue-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/projects" className="text-white hover:text-blue-400 transition">Projects</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-blue-400 transition">About</Link>
          </li>
        </ul>
      </nav>
      
      <div className="flex justify-center">
        {cardData && <BusinessCard cardData={cardData} />}
      </div>
    </div>
  );
}

export default Home;
