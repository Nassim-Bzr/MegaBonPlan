import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './header.css';
import { 
  FaSearch, 
  FaBell, 
  FaChartLine, 
  FaPlus, 
  FaBars, 
  FaTimes,
  FaUser,
  FaHeart,
  FaFire,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaStar,
  FaTrophy,
  FaNewspaper
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { title: 'Bons plans', path: '/bonsplans', icon: FaFire },
    { title: 'Gratuit', path: '/gratuit', icon: FaStar },
    { title: 'Discussions', path: '/discussions', icon: FaComments },
    { title: 'Club', path: '/club', icon: FaTrophy }
  ];

  const categories = [
    'High-Tech',
    'Consoles & Jeux vidéo', 
    'Épicerie & Courses',
    'Mode & Accessoires',
    'Santé & Cosmétiques',
    'Voyages',
    'Famille & Enfants',
    'Maison & Habitat',
    'Jardin & Bricolage',
    'Auto-Moto',
    'Culture & Divertissement',
    'Sports & Plein air'
  ];

  const codePromoMerchants = [
    'Amazon',
    'Carrefour', 
    'Cdiscount',
    'Nike',
    'SheIn',
    'SNCF Connect',
    'Zalando',
    'Bouygues Telecom',
    'H&M',
    'HP',
    'I-Run',
    'Lastminute',
    'Marionnaud'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <header className="dealabs-header">
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <button className="menu-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <Link to="/" className="dealabs-logo">
              MEGABONPLAN
            </Link>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <form className="dealabs-search" onSubmit={handleSearch}>
              <input 
                type="text"
                className="search-input-dealabs"
                placeholder="🔍 Rechercher un deal ou un marchand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Navigation Section */}
          <div className="nav-section">
            <nav>
              <ul className="nav-links">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* User Section */}
          <div className="user-section">
            {user ? (
              <>
                <button className="alerts-button">
                  <FaBell />
                  <span className="notification-badge">3</span>
                </button>
                
                <button className="activity-button">
                  <FaChartLine />
                  <span className="notification-badge">12</span>
                </button>

                <div className="user-profile" onClick={toggleDropdown}>
                  <div className="user-avatar">
                    {user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{user.nom || 'Utilisateur'}</span>
                  
                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <Link to="/profil" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaUser className="dropdown-icon" />
                        Profil
                      </Link>
                      <Link to="/points-club" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaTrophy className="dropdown-icon" />
                        Points Club
                      </Link>
                      <Link to="/fil-alertes" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaBell className="dropdown-icon" />
                        Fil d'alertes
                      </Link>
                      <Link to="/favoris" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaHeart className="dropdown-icon" />
                        Deals sauvegardés
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/activite" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaChartLine className="dropdown-icon" />
                        Activité
                      </Link>
                      <Link to="/mes-deals" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaFire className="dropdown-icon" />
                        Deals postés
                      </Link>
                      <Link to="/offres-parrainage" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaNewspaper className="dropdown-icon" />
                        Offres de parrainage postées
                      </Link>
                      <Link to="/discussions-postees" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaComments className="dropdown-icon" />
                        Discussions postées
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/badges" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaStar className="dropdown-icon" />
                        Badges
                      </Link>
                      <Link to="/statistiques" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaChartLine className="dropdown-icon" />
                        Statistiques
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/subscription" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaTrophy className="dropdown-icon" />
                        Premium
                      </Link>
                      <Link to="/parametres" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <FaCog className="dropdown-icon" />
                        Paramètres
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>

                <Link to="/poster" className="post-button">
                  <FaPlus />
                  Poster
                </Link>
              </>
            ) : (
              <div style={{display: 'flex', gap: '12px'}}>
                <Link to="/connexion" className="nav-link">Connexion</Link>
                <Link to="/inscription" className="post-button">Inscription</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="sidebar-overlay" 
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1002
            }}
          />
          <div 
            className="sidebar"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '320px',
              height: '100vh',
              background: '#1a1a1a',
              zIndex: 1003,
              overflowY: 'auto',
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Sidebar Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #2a2a2a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{color: '#fff', fontSize: '18px', fontWeight: 'bold'}}>
                Catégories
              </span>
              <button 
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Categories */}
            <div style={{padding: '16px'}}>
              <div style={{marginBottom: '24px'}}>
                <Link 
                  to="/category" 
                  style={{
                    color: '#00b4d8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onClick={toggleSidebar}
                >
                  Tout voir
                </Link>
              </div>
              
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={toggleSidebar}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 0',
                    color: '#cccccc',
                    textDecoration: 'none',
                    borderBottom: index < categories.length - 1 ? '1px solid #2a2a2a' : 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#cccccc'}
                >
                  <span style={{marginRight: '12px'}}>🏷️</span>
                  {category}
                  <span style={{marginLeft: 'auto', color: '#666'}}>›</span>
                </Link>
              ))}
            </div>

            {/* Codes Promo Section */}
            <div style={{
              borderTop: '1px solid #2a2a2a',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <span style={{color: '#fff', fontSize: '18px', fontWeight: 'bold'}}>
                  Codes promo
                </span>
                <Link 
                  to="/codespromos" 
                  style={{
                    color: '#00b4d8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onClick={toggleSidebar}
                >
                  Tout voir
                </Link>
              </div>
              
              {codePromoMerchants.map((merchant, index) => (
                <Link
                  key={index}
                  to={`/codes-promo/${merchant.toLowerCase()}`}
                  onClick={toggleSidebar}
                  style={{
                    display: 'block',
                    padding: '8px 0',
                    color: '#cccccc',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#cccccc'}
                >
                  {merchant}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
