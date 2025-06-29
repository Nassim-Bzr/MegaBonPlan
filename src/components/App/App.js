import './App.css'
import CurrentCategory from '../CurrentCategory/index'
import Footer from '../Footer/index'
import Header from '../Header/index'
import Home from '../Home/index'
import Signin from '../Signin/index'
import Signup from '../SignUp/index'
import { Routes, Route } from 'react-router-dom'
import Category from '../Category/Category'
import VerifyAccount from '../VerifyAccount/index'
import VerificationSuccess from '../VerificationSuccess/index'
import BonPlans from '../BonsPlans/index'
import CodesPromos from '../CodePromos'
import Discussions from '../Discussions'
import Contact from '../Contact'
import ForgotPassword from '../ForgotPassword'
import Profil from '../Profil'
import Faq from '../Faq'
import LoginSuccess from '../LoginSuccess'
import AdminPage from '../AdminPage'
import BonPlanDetails from '../BonPlanDetails'
import Favoris from '../FavorisPage'
import ChangePassword from '../ChangePassword'
import ModifierProfil from '../ModifierProfil';
import UserProfilePage from '../UserProfilePage'; // Importer le nouveau composant
import SubscriptionManager from '../SubscriptionManager'; // Import de la page d'abonnement
import { ThemeContext } from '../../contexts/ThemContext';
import { useContext } from 'react';
import DetailsDiscussion from '../DetailsDiscussion'

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'} `} data-testid="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modifier-profil" element={<ModifierProfil />} />
        <Route path="/bonplans/details/:id" element={<BonPlanDetails />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/connexion" element={<Signin />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/category" element={<Category />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/bonsplans" element={<BonPlans />} />
        <Route path="/codespromos" element={<CodesPromos />} />
        <Route path="/subscription" element={<SubscriptionManager />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:categoryId" element={<CurrentCategory />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/connexion" element={<Signin />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/category" element={<Category />} />
        <Route path="/bonsplans" element={<BonPlans />} />
        <Route path="/codespromos" element={<CodesPromos />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/discussions/:id" element={<DetailsDiscussion />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/somewhere-after-success" element={<VerificationSuccess />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} /> {/* Nouvelle route */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
