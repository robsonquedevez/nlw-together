import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roons/new" element={<NewRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
