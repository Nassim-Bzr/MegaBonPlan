import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Navigation() {
  const { user } = useAuth();

  return (
    <nav>
      {/* ... autres liens ... */}
      {user && (
        <Link to="/profile" className="nav-link">
          Mon Profil
        </Link>
      )}
    </nav>
  );
}