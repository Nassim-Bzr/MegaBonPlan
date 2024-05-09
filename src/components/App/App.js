import './App.css'
import CurrentCategory from '../CurrentCategory/index'
import Footer from '../Footer/index'
import Header from '../Header/index'
import Home from '../Home/index'
import Signin from '../Signin/index'
import Signup from '../SignUp/index' // Assurez-vous d'avoir un composant pour la page 'À propos'
// Autres imports de pages si nécessaire
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
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:categoryId" element={<CurrentCategory />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/connexion" element={<Signin />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/category" element={<Category />} />
        <Route path="/bonsplans" element={<BonPlans />} />
        <Route path="/codespromos" element={<CodesPromos />} />
        <Route path="/discussions" element={<Discussions />} />{' '}
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/somewhere-after-success"
          element={<VerificationSuccess />}
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
