import './App.css';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">

<Router>
     <Header/>
    <Home/>
     <Footer/>
    </Router>
    </div>
  );
}

export default App;
