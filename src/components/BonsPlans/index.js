import React, { useState, useEffect } from 'react';
import './bonplans.css';
import { Link } from 'react-router-dom';
import BonPlanCard from '../BonPlanCard/index';
import { useAuth } from '../../AuthContext';
import { FaFilter, FaSortAmountDown, FaTrash, FaEdit, FaPlus, FaSearch, FaFire, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BonsPlans = () => {
  const [bonPlans, setBonPlans] = useState([]);
  const [filteredBonPlans, setFilteredBonPlans] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tous');
  const [currentHotSlide, setCurrentHotSlide] = useState(0);
  const { user } = useAuth();
  const [selectedBonPlans, setSelectedBonPlans] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingBonPlan, setEditingBonPlan] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('hot');

  useEffect(() => {
    fetchBonPlans();
    fetchHotDeals();
  }, []);

  useEffect(() => {
    filterBonPlans();
  }, [bonPlans, activeTab]);

  const fetchBonPlans = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bonplans');
      if (response.ok) {
        const data = await response.json();
        setBonPlans(data);
      } else {
        // Données factices si l'API ne fonctionne pas
        setBonPlans(mockBonPlans);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des bons plans:', error);
      setBonPlans(mockBonPlans);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotDeals = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/bonplans/hot');
      if (response.ok) {
        const data = await response.json();
        setHotDeals(data.slice(0, 6));
      } else {
        setHotDeals(mockHotDeals);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des hot deals:', error);
      setHotDeals(mockHotDeals);
    }
  };

  const mockBonPlans = [
    {
      id_bonplan: 1,
      titre: "Pied à coulisse Facom 2520.00PB intérieur/extérieur/profondeur",
      prix_reduit: "38.94",
      prix_initial: "64.92",
      temperature_score: 100,
      imglink: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop",
      description: "Performance et polyvalence : le pied à coulisse intérieur/extérieur/profondeur SC.2520.00 FACOM donne à l'utilisateur la possibilité de mesurer efficacement le diamètre interne, le diamètre...",
      merchant: "Amazon",
      date_creation: "2025-01-15T10:30:00Z",
      gratuit: false,
      likes: 46
    },
    {
      id_bonplan: 2,
      titre: "Lot de 4 Kiwi jaune origine France soit 0.55€ l'unité",
      prix_reduit: "2.20",
      prix_initial: "2.76",
      temperature_score: 117,
      imglink: "https://images.unsplash.com/photo-1555072956-7758afb4d469?w=300&h=200&fit=crop",
      description: "-0.56€ sur le quatrième kiwi jaune ce qui ramène l'unité à 0.55€ si acheté par 4.",
      merchant: "Auchan",
      date_creation: "2025-01-15T09:15:00Z",
      gratuit: false,
      likes: 1
    }
  ];

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
      merchant: "Brico Dépôt"
    },
    {
      id: 3,
      titre: 'TV 65" TCL 65C89B - Mini-LED, 4K UHD, 144Hz, HDR10+, Dolby Vision IQ, FreeSync Premium',
      prix_reduit: "720.62€",
      prix_initial: "999.99€",
      temperature_score: 551,
      imglink: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=80&h=80&fit=crop",
      merchant: "Amazon"
    }
  ];

  const filterBonPlans = () => {
    let filtered = [...bonPlans];

    switch (activeTab) {
      case 'tendance':
        filtered = filtered.filter(plan => (plan.temperature_score || 0) >= 50);
        filtered.sort((a, b) => (b.temperature_score || 0) - (a.temperature_score || 0));
        break;
      case 'tous99':
        filtered = filtered.filter(plan => (plan.temperature_score || 0) >= 99);
        filtered.sort((a, b) => (b.temperature_score || 0) - (a.temperature_score || 0));
        break;
      case 'commentes':
        filtered = filtered.filter(plan => (plan.likes || 0) > 0);
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
    }

    setFilteredBonPlans(filtered);
  };

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

  const nextHotSlide = () => {
    setCurrentHotSlide((prev) => (prev + 1) % Math.ceil(hotDeals.length / 3));
  };

  const prevHotSlide = () => {
    setCurrentHotSlide((prev) => 
      prev === 0 ? Math.ceil(hotDeals.length / 3) - 1 : prev - 1
    );
  };

  const tabs = [
    { id: 'tous', label: 'Tous les deals', count: bonPlans.length },
    { id: 'tendance', label: 'Tendance', count: bonPlans.filter(p => (p.temperature_score || 0) >= 50).length },
    { id: 'tous99', label: 'Tous', badge: '99+', count: bonPlans.filter(p => (p.temperature_score || 0) >= 99).length },
    { id: 'commentes', label: 'Commentés', count: bonPlans.filter(p => (p.likes || 0) > 0).length }
  ];

  if (loading) {
    return (
      <div className="dealabs-page">
        <div className="deals-loading">
          <div className="loading-spinner"></div>
          <p>Chargement des bons plans...</p>
        </div>
      </div>
    );
  }

  const visibleHotDeals = hotDeals.slice(currentHotSlide * 3, (currentHotSlide + 1) * 3);

  return (
    <div className="dealabs-page">
      {/* Summer Banner */}
      <div className="summer-banner">
        <div className="banner-content">
          <h1 className="banner-title">Soldes d'été 2025</h1>
          <p className="banner-subtitle">Profitez de nos offres estivales</p>
        </div>
        <div className="banner-decoration">☀️🏖️</div>
      </div>

      {/* Navigation Tabs */}
      <nav className="deals-navigation">
        <div className="nav-tabs-container">
          <ul className="nav-tabs">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-tab">
                <button
                  className={`nav-tab-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  {tab.badge && <span className="nav-badge">{tab.badge}</span>}
                </button>
              </li>
            ))}
          </ul>
          
          <button className="filter-button">
            <FaFilter />
            Filter
            <span className="filter-badge">1</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="deals-main-content">
        {/* Deals Content */}
        <div className="deals-content">
          {filteredBonPlans.length > 0 ? (
            <div className="deals-list">
              {filteredBonPlans.map((bonPlan) => (
                <BonPlanCard
                  key={bonPlan.id_bonplan}
                  bonPlan={bonPlan}
                  currentUser={user}
                />
              ))}
            </div>
          ) : (
            <div className="deals-empty">
              <div className="empty-icon">😔</div>
              <h3 className="empty-title">Aucun bon plan trouvé</h3>
              <p className="empty-message">
                Essayez de changer de catégorie ou revenez plus tard pour de nouvelles offres !
              </p>
            </div>
          )}
        </div>

        {/* Hot Deals Sidebar */}
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
              {visibleHotDeals.map((deal, index) => (
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
                  
                  <div className="hot-deal-content-inner">
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
                  onClick={prevHotSlide}
                  disabled={currentHotSlide === 0}
                >
                  <FaChevronLeft />
                </button>
                
                <div className="slide-indicators">
                  {Array.from({ length: Math.ceil(hotDeals.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      className={`slide-indicator ${index === currentHotSlide ? 'active' : ''}`}
                      onClick={() => setCurrentHotSlide(index)}
                    />
                  ))}
                </div>
                
                <button 
                  className="nav-button next-button" 
                  onClick={nextHotSlide}
                  disabled={currentHotSlide === Math.ceil(hotDeals.length / 3) - 1}
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
      </div>
    </div>
  );
};

export default BonsPlans;
