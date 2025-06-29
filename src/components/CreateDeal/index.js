import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './CreateDeal.css';
import { 
  FaLink, 
  FaStar, 
  FaImages, 
  FaFileText, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUpload,
  FaTrash
} from 'react-icons/fa';

const CreateDeal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dealData, setDealData] = useState({
    lien: '',
    titre: '',
    prix_reduit: '',
    prix_initial: '',
    description: '',
    gratuit: false,
    code_promo: '',
    id_categorie: '',
    imglink: '',
    livraison: '',
    expiration: ''
  });
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      id: 'lien',
      title: 'Lien',
      icon: FaLink,
      description: 'Entrez le lien de la page où il est possible de profiter du deal',
      required: false
    },
    {
      id: 'essentiel',
      title: 'Essentiel',
      icon: FaStar,
      description: 'Informations essentielles du deal',
      required: true
    },
    {
      id: 'galerie',
      title: 'Galerie d\'images',
      icon: FaImages,
      description: 'Ajoutez des images pour illustrer votre deal',
      required: false
    },
    {
      id: 'description',
      title: 'Description',
      icon: FaFileText,
      description: 'Décrivez votre deal en détail',
      required: false
    },
    {
      id: 'verification',
      title: 'Vérification',
      icon: FaEye,
      description: 'Vérifiez toutes les informations avant publication',
      required: true
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/connexion');
      return;
    }
    
    fetchCategories();
  }, [user, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      // Categories factices
      setCategories([
        { id_categorie: 1, nomcategorie: 'High-Tech' },
        { id_categorie: 2, nomcategorie: 'Mode & Accessoires' },
        { id_categorie: 3, nomcategorie: 'Maison & Habitat' },
        { id_categorie: 4, nomcategorie: 'Sports & Plein air' }
      ]);
    }
  };

  const handleInputChange = (field, value) => {
    setDealData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1: // Essentiel
        if (!dealData.titre.trim()) {
          newErrors.titre = 'Le titre est obligatoire';
        }
        if (!dealData.prix_reduit && !dealData.gratuit) {
          newErrors.prix_reduit = 'Le prix ou gratuit est obligatoire';
        }
        if (!dealData.id_categorie) {
          newErrors.id_categorie = 'La catégorie est obligatoire';
        }
        break;
      case 4: // Vérification
        if (!dealData.titre.trim()) {
          newErrors.titre = 'Le titre est obligatoire';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      // Upload des images si nécessaire
      let imageUrl = '';
      if (images.length > 0) {
        // Simuler l'upload d'image
        imageUrl = images[0].url;
      }

      const dealPayload = {
        ...dealData,
        imglink: imageUrl || dealData.imglink,
        id_utilisateur: user.id_utilisateur
      };

      const response = await fetch('http://localhost:8080/api/bonplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dealPayload)
      });

      if (response.ok) {
        alert('Deal créé avec succès !');
        navigate('/bonsplans');
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de la création: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la création du deal:', error);
      alert('Une erreur est survenue lors de la création du deal');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Lien
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Partager un bon plan avec des millions de personnes</h2>
              <p>Entrez le lien de la page où il est possible de profiter du deal / d'obtenir davantage d'informations.</p>
            </div>
            
            <div className="form-group">
              <label>Lien du deal</label>
              <div className="input-with-icon">
                <FaLink className="input-icon" />
                <input
                  type="url"
                  placeholder="https://www.example.com/superdeal"
                  value={dealData.lien}
                  onChange={(e) => handleInputChange('lien', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="step-actions">
              <button 
                className="btn-continue"
                onClick={nextStep}
              >
                Continuer
                <FaChevronRight />
              </button>
              
              <button 
                className="btn-no-link"
                onClick={nextStep}
              >
                Je n'ai pas de lien
              </button>
            </div>
          </div>
        );

      case 1: // Essentiel
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Informations essentielles</h2>
              <p>Renseignez les informations principales de votre deal.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Titre du deal *</label>
                <input
                  type="text"
                  placeholder="Décrivez votre deal en quelques mots"
                  value={dealData.titre}
                  onChange={(e) => handleInputChange('titre', e.target.value)}
                  className={`input-field ${errors.titre ? 'error' : ''}`}
                />
                {errors.titre && <span className="error-message">{errors.titre}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix réduit *</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={dealData.prix_reduit}
                    onChange={(e) => handleInputChange('prix_reduit', e.target.value)}
                    className={`input-field ${errors.prix_reduit ? 'error' : ''}`}
                    disabled={dealData.gratuit}
                  />
                  {errors.prix_reduit && <span className="error-message">{errors.prix_reduit}</span>}
                </div>

                <div className="form-group">
                  <label>Prix initial</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={dealData.prix_initial}
                    onChange={(e) => handleInputChange('prix_initial', e.target.value)}
                    className="input-field"
                    disabled={dealData.gratuit}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={dealData.gratuit}
                    onChange={(e) => handleInputChange('gratuit', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  C'est gratuit
                </label>
              </div>

              <div className="form-group">
                <label>Catégorie *</label>
                <select
                  value={dealData.id_categorie}
                  onChange={(e) => handleInputChange('id_categorie', e.target.value)}
                  className={`input-field ${errors.id_categorie ? 'error' : ''}`}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id_categorie} value={cat.id_categorie}>
                      {cat.nomcategorie}
                    </option>
                  ))}
                </select>
                {errors.id_categorie && <span className="error-message">{errors.id_categorie}</span>}
              </div>

              <div className="form-group">
                <label>Code promo</label>
                <input
                  type="text"
                  placeholder="CODE2025"
                  value={dealData.code_promo}
                  onChange={(e) => handleInputChange('code_promo', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Galerie
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Galerie d'images</h2>
              <p>Ajoutez des images pour illustrer votre deal et le rendre plus attractif.</p>
            </div>
            
            <div className="image-upload-area">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              
              {images.length === 0 ? (
                <label htmlFor="image-upload" className="upload-placeholder">
                  <FaUpload className="upload-icon" />
                  <p>Cliquez pour ajouter des images</p>
                  <small>PNG, JPG, GIF jusqu'à 10MB</small>
                </label>
              ) : (
                <div className="image-gallery">
                  {images.map(image => (
                    <div key={image.id} className="image-preview">
                      <img src={image.url} alt="Preview" />
                      <button
                        className="remove-image"
                        onClick={() => removeImage(image.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  
                  <label htmlFor="image-upload" className="add-more-images">
                    <FaUpload />
                    Ajouter
                  </label>
                </div>
              )}
            </div>
          </div>
        );

      case 3: // Description
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Description détaillée</h2>
              <p>Décrivez votre deal, ajoutez des détails utiles, des conseils d'utilisation, etc.</p>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Décrivez votre deal en détail..."
                value={dealData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="textarea-field"
                rows={8}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Frais de livraison</label>
                <input
                  type="text"
                  placeholder="Gratuit, 3.99€, etc."
                  value={dealData.livraison}
                  onChange={(e) => handleInputChange('livraison', e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div className="form-group">
                <label>Date d'expiration</label>
                <input
                  type="date"
                  value={dealData.expiration}
                  onChange={(e) => handleInputChange('expiration', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        );

      case 4: // Vérification
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Vérification finale</h2>
              <p>Vérifiez toutes les informations avant de publier votre deal.</p>
            </div>
            
            <div className="deal-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <h3>{dealData.titre || 'Titre du deal'}</h3>
                  <div className="preview-price">
                    {dealData.gratuit ? (
                      <span className="price-free">Gratuit</span>
                    ) : (
                      <>
                        <span className="price-current">{dealData.prix_reduit}€</span>
                        {dealData.prix_initial && (
                          <span className="price-original">{dealData.prix_initial}€</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {images.length > 0 && (
                  <div className="preview-image">
                    <img src={images[0].url} alt="Deal preview" />
                  </div>
                )}
                
                {dealData.description && (
                  <div className="preview-description">
                    <p>{dealData.description}</p>
                  </div>
                )}
                
                <div className="preview-meta">
                  {dealData.code_promo && (
                    <div className="preview-code">
                      Code: <strong>{dealData.code_promo}</strong>
                    </div>
                  )}
                  {dealData.livraison && (
                    <div className="preview-shipping">
                      Livraison: {dealData.livraison}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="create-deal-page">
      <div className="create-deal-container">
        {/* Header */}
        <div className="create-deal-header">
          <h1>Que souhaitez-vous publier ?</h1>
          <div className="deal-type-selected">
            <div className="deal-type-card selected">
              <FaStar className="deal-type-icon" />
              <div>
                <h3>Deal</h3>
                <p>Publier une offre promotionnelle sur un produit comme une TV, avec ou sans code promo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {index < currentStep ? (
                  <FaCheck />
                ) : (
                  <step.icon />
                )}
              </div>
              <div className="step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-container">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="step-navigation">
          {currentStep > 0 && (
            <button className="btn-back" onClick={prevStep}>
              <FaChevronLeft />
              Retour
            </button>
          )}
          
          <div className="nav-right">
            {currentStep < steps.length - 1 ? (
              <button className="btn-continue" onClick={nextStep}>
                Continuer
                <FaChevronRight />
              </button>
            ) : (
              <button 
                className="btn-publish" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Publication...' : 'Publier le deal'}
                <FaCheck />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeal; 