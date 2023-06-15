import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import HomePage from './pages/HomePage';
import SmartFormPage from './pages/SmartFormPage';
import DragAndDropPage from './pages/DragAndDropPage';
import TikTokPage from './pages/TikTokPage';
import GdpIntegrationPage from './pages/GPTIntegrationPage';
import GroupableTable from './pages/GroupableTable';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/smart-form' element={<SmartFormPage />}/>
            <Route path='/groupable-table' element={<GroupableTable/>} />
            <Route path='/dd-func' element={<DragAndDropPage />}/>
            <Route path='/tik-tok-page' element={<TikTokPage />}/>
            <Route path='/gdp' element={<GdpIntegrationPage />}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
