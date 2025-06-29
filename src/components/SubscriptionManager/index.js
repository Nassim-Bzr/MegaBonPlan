import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import './SubscriptionManager.css';
import { FaCrown, FaRocket, FaStar, FaCheck, FaChartLine, FaCalendarAlt, FaFireAlt } from 'react-icons/fa';

const SubscriptionManager = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserSubscription();
    }
  }, [user]);

  const fetchUserSubscription = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/subscriptions/user/${user.id}`);
      const data = await response.json();
      if (data.success) {
        setSubscription(data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planType) => {
    setUpgrading(true);
    try {
      const endpoint = planType === 'PREMIUM' 
        ? '/api/subscriptions/upgrade/premium'
        : '/api/subscriptions/upgrade/premium-plus';

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          paymentData: {
            // Données de paiement simulées
            cardNumber: '4242424242424242',
            expiryDate: '12/25',
            cvv: '123'
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('🎉 Félicitations ! Votre upgrade a été effectué avec succès !');
        fetchUserSubscription(); // Rafraîchir les données
      } else {
        alert('❌ Erreur lors de l\'upgrade: ' + data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'upgrade:', error);
      alert('❌ Erreur lors de l\'upgrade');
    } finally {
      setUpgrading(false);
    }
  };

  const plans = [
    {
      type: 'FREE',
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      posts: '3',
      icon: <FaStar className="plan-icon" />,
      subtitle: 'Pour commencer',
      features: [
        '3 bons plans par mois',
        'Accès aux deals chauds',
        'Système de favoris',
        'Commentaires et votes',
        'Notifications de base'
      ],
      buttonText: subscription?.plan_type === 'FREE' ? 'Plan actuel' : 'Gratuit',
      disabled: subscription?.plan_type === 'FREE'
    },
    {
      type: 'PREMIUM',
      name: 'Premium',
      price: '9.99€',
      period: '/mois',
      posts: '10',
      icon: <FaCrown className="plan-icon" />,
      subtitle: 'Le plus populaire',
      features: [
        '10 bons plans par mois',
        'Toutes les fonctionnalités gratuites',
        'Priorité dans les recherches',
        'Badge Premium visible',
        'Support par email',
        'Statistiques avancées'
      ],
      buttonText: 'Passer à Premium',
      disabled: subscription?.plan_type === 'PREMIUM' || subscription?.plan_type === 'PREMIUM_PLUS',
      popular: true
    },
    {
      type: 'PREMIUM_PLUS',
      name: 'Premium Plus',
      price: '19.99€',
      period: '/mois',
      posts: '50',
      icon: <FaRocket className="plan-icon" />,
      subtitle: 'Pour les experts',
      features: [
        '50 bons plans par mois',
        'Toutes les fonctionnalités Premium',
        'Support prioritaire 24/7',
        'Accès anticipé aux nouveautés',
        'Badge Premium Plus exclusif',
        'API personnalisée',
        'Rapports détaillés'
      ],
      buttonText: 'Passer à Premium Plus',
      disabled: subscription?.plan_type === 'PREMIUM_PLUS'
    }
  ];

  const faqItems = [
    {
      question: "Que se passe-t-il si j'atteins ma limite mensuelle ?",
      answer: "Vous devrez attendre le mois suivant ou upgrader votre plan pour continuer à poster des bons plans. Vos posts existants restent visibles."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment. Vous continuerez à bénéficier des avantages jusqu'à la fin de la période payée."
    },
    {
      question: "Les badges Premium sont-ils visibles par tous ?",
      answer: "Oui, les badges Premium et Premium Plus sont affichés sur votre profil et à côté de vos posts pour montrer votre statut dans la communauté."
    },
    {
      question: "Que comprend le support prioritaire ?",
      answer: "Le support prioritaire vous garantit une réponse dans les 24h pour Premium et dans les 2h pour Premium Plus, avec un accès direct à notre équipe technique."
    }
  ];

  if (loading) {
    return (
      <div className="subscription-loading">
        <div className="spinner"></div>
        <p>Chargement de votre abonnement...</p>
      </div>
    );
  }

  return (
    <div className="subscription-manager">
      <div className="subscription-header">
        <h2>Abonnements Premium</h2>
        <p className="subscription-tagline">
          Débloquez tout le potentiel de MegaBonPlan et devenez un chasseur de deals professionnel
        </p>
        
        {subscription && (
          <div className="current-plan-info">
            <h3>Tableau de bord</h3>
            <div className="plan-stats">
              <div className="stat-box">
                <span className="stat-number">{subscription.plan_type}</span>
                <span className="stat-label">Plan actuel</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{subscription.posts_used}</span>
                <span className="stat-label">Posts utilisés</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{subscription.remaining_posts}</span>
                <span className="stat-label">Posts restants</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{subscription.posts_limit}</span>
                <span className="stat-label">Limite mensuelle</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.type} className={`plan-card ${plan.popular ? 'popular' : ''} ${subscription?.plan_type === plan.type ? 'current' : ''}`}>
            {plan.popular && <div className="popular-badge">Le plus populaire</div>}
            {subscription?.plan_type === plan.type && <div className="current-badge">Plan actuel</div>}
            
            <div className="plan-header">
              {plan.icon}
              <h3>{plan.name}</h3>
              <p className="plan-subtitle">{plan.subtitle}</p>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
            </div>

            <div className="plan-features">
              <div className="posts-highlight">
                <strong>{plan.posts} bons plans</strong> par mois
              </div>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`plan-button ${plan.disabled ? 'disabled' : ''}`}
              disabled={plan.disabled || upgrading}
              onClick={() => !plan.disabled && plan.type !== 'FREE' && handleUpgrade(plan.type)}
            >
              {upgrading ? '⏳ Traitement...' : plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-faq">
        <h3>Questions fréquentes</h3>
        <div className="faq-grid">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager; 