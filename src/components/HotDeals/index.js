import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HotDeals.css';
import { FaFire, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotDeals();
  }, []);

  const fetchHotDeals = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bonplans/hot');
      if (response.ok) {
        const data = await response.json();
        setHotDeals(data.slice(0, 6)); // Limite à 6 deals les plus chauds
      } else {
        // Données factices si l'API ne fonctionne pas
        setHotDeals(mockHotDeals);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des hot deals:', error);
      setHotDeals(mockHotDeals);
    } finally {
      setIsLoading(false);
    }
  };

  const mockHotDeals = [
    {
      id: 1,
      titre: "[Lidl] Livraison gratuite sans minimum d'achat (locker, relais et à domicile)",
      prix_reduit: "0€",
      prix_initial: null,
      temperature_score: 3198,
      imglink: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=80&h=80&fit=crop",
      merchant: "Lidl",
      deal_type: "gratuit"
    },
    {
      id: 2,
      titre: "Récupérateur d'eau 650 litres Belli - Brico Dépôt Canne-Écluses",
      prix_reduit: "34.80€",
      prix_initial: "69.60€",
      temperature_score: 621,
      imglink: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop",
      merchant: "Brico Dépôt",
      deal_type: "deal"
    },
    {
      id: 3,
      titre: 'TV 65" TCL 65C89B - Mini-LED, 4K UHD, 144Hz, HDR10+, Dolby Vision IQ, FreeSync Premium',
      prix_reduit: "720.62€",
      prix_initial: "999.99€",
      temperature_score: 551,
      imglink: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=80&h=80&fit=crop",
      merchant: "Amazon",
      deal_type: "deal"
    },
    {
      id: 4,
      titre: "Pass circuits additionnels de Mario Kart 8 Deluxe sur Nintendo Switch - Carrefour",
      prix_reduit: "7.50€",
      prix_initial: "24.99€",
      temperature_score: 482,
      imglink: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=80&h=80&fit=crop",
      merchant: "Carrefour",
      deal_type: "deal"
    },
    {
      id: 5,
      titre: "SSD M.2 2280 WD Blue SN580 NVMe - 1 To",
      prix_reduit: "59.99€",
      prix_initial: "89.99€",
      temperature_score: 398,
      imglink: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=80&h=80&fit=crop",
      merchant: "Amazon",
      deal_type: "deal"
    },
    {
      id: 6,
      titre: "Smartphone Samsung Galaxy S24+ 5G - 256 Go",
      prix_reduit: "899.00€",
      prix_initial: "1199.00€",
      temperature_score: 342,
      imglink: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=80&h=80&fit=crop",
      merchant: "Samsung",
      deal_type: "deal"
    }
  ];

  const getTemperatureColor = (temp) => {
    if (temp >= 1000) return '#ff4444';
    if (temp >= 500) return '#ff6600';
    if (temp >= 200) return '#ff9900';
    if (temp >= 100) return '#ffcc00';
    return '#00b4d8';
  };

  const getTemperatureIcon = (temp) => {
    if (temp >= 1000) return '🔥🔥🔥';
    if (temp >= 500) return '🔥🔥';
    if (temp >= 200) return '🔥';
    return '💧';
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(hotDeals.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(hotDeals.length / 3) - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="hot-deals-sidebar">
        <div className="hot-deals-header">
          <h3>Les + hot</h3>
          <span className="hot-deals-subtitle">Jour ▼</span>
        </div>
        <div className="hot-deals-loading">
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const visibleDeals = hotDeals.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <div className="hot-deals-sidebar">
      <div className="hot-deals-header">
        <h3>
          <FaFire className="hot-icon" />
          Les + hot
        </h3>
        <span className="hot-deals-subtitle">Jour ▼</span>
      </div>

      <div className="hot-deals-content">
        <div className="hot-deals-list">
          {visibleDeals.map((deal, index) => (
            <Link 
              key={deal.id} 
              to={`/bonplans/details/${deal.id}`} 
              className="hot-deal-item"
            >
              <div className="hot-deal-image">
                <img 
                  src={deal.imglink || 'https://via.placeholder.com/80x80'} 
                  alt={deal.titre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=Deal';
                  }}
                />
                {deal.deal_type === 'gratuit' && (
                  <div className="gratuit-badge">Gratuit</div>
                )}
              </div>
              
              <div className="hot-deal-content">
                <div className="hot-deal-temperature">
                  <span 
                    className="temperature-value"
                    style={{ color: getTemperatureColor(deal.temperature_score) }}
                  >
                    {deal.temperature_score}°
                  </span>
                  <span className="temperature-icon">
                    {getTemperatureIcon(deal.temperature_score)}
                  </span>
                </div>
                
                <h4 className="hot-deal-title">
                  {deal.titre.length > 50 
                    ? `${deal.titre.substring(0, 50)}...` 
                    : deal.titre
                  }
                </h4>
                
                <div className="hot-deal-price">
                  <span className="current-price">{deal.prix_reduit}</span>
                  {deal.prix_initial && (
                    <span className="original-price">{deal.prix_initial}</span>
                  )}
                </div>
                
                <div className="hot-deal-merchant">
                  <span className="merchant-name">{deal.merchant}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hotDeals.length > 3 && (
          <div className="hot-deals-navigation">
            <button 
              className="nav-button prev-button" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <FaChevronLeft />
            </button>
            
            <div className="slide-indicators">
              {Array.from({ length: Math.ceil(hotDeals.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            
            <button 
              className="nav-button next-button" 
              onClick={nextSlide}
              disabled={currentSlide === Math.ceil(hotDeals.length / 3) - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="hot-deals-footer">
        <Link to="/bonsplans?sort=hot" className="view-all-link">
          Voir tous les hot deals →
        </Link>
      </div>
    </div>
  );
};

export default HotDeals; 