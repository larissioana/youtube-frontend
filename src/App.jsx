import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import VideoDetails from './components/pages/videoDetails/VideoDetails';
import Channel from './components/pages/channel/Channel';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import SearchedResultsPage from './components/pages/searchedResults/SearchedResultsPage';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark-theme" : false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", isDarkMode ? "dark-theme" : "light-theme")
  }, [isDarkMode]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        <Routes>
          <Route path="/" element={<Home isMenuOpen={isMenuOpen} />} />
          <Route path="/video/:id" element={<VideoDetails isMenuOpen={isMenuOpen} />} />
          <Route path="/channel/:id" element={<Channel isMenuOpen={isMenuOpen} />} />
          <Route path="/search" element={<SearchedResultsPage isMenuOpen={isMenuOpen} />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
