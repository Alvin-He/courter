import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom'; 

import SigninLanding from './pages/signin/signin';
import Admin from './pages/admin/admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninLanding />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
