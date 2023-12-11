import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import PostDetail from './component/PostDetail';

const App: React.FC = () => {
 return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:id" element={<PostDetail />} />
    </Routes>
  </Router>
 );
};

export default App;
