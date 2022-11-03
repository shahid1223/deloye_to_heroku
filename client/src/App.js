import React, { Fragment } from 'react';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import LandingPageIndex from './pages/LandingPage/LandingPageIndex';
import { Routes, Route } from 'react-router-dom';
import DocumentionIndex from './pages/Documention/DocumentionIndex';

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="py-6 px-6">
        <Routes>
          <Route path='/' element={<LandingPageIndex />} />
          <Route path='/docs' element={<DocumentionIndex />} />
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
