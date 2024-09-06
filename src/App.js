import UserProfile from './components/UserProfile';

// ... autres imports ...

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* ... autres routes ... */}
        <Route path="/profile" element={<UserProfile />} />
      </AuthProvider>
    </Router>
  );
}