import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';


import Home from './pages/Home';
import NewRoom from './pages/NewRoom';


const App: React.FC = () => {
  

  return (
    <BrowserRouter>  
      <AuthContextProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roons/new" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>    
    </BrowserRouter>
  );
}

export default App;
