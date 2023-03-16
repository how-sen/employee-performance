import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Hour from './pages/hours';
import Performance from './pages/performance';
  
function App() {
return (
    <Router>
      <Routes>
          <Route path='/hours' element={<Hour/>} />
          <Route path='/performance' element={<Performance/>} />
      </Routes>
    </Router>
);
}
  
export default App