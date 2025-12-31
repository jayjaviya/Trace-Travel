import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { ThemeContext } from './ThemeContext'; 

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconClass = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  const location = useLocation(); // Get current route
  
  // State to track active link
  const [activeLink, setActiveLink] = useState('/');

  // Update active link when route changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // ------------------------------------------------------------------
  // 1. Navigation Icon Toggle
  // ------------------------------------------------------------------
  useEffect(() => {
    const navBtn = document.querySelector('i.fa.fa-bars');
    const navList = document.querySelector('.nav_ul');

    const toggleNav = () => {
      if (navList) {
        navList.classList.toggle("active");
      }
    };

    if (navBtn) {
      navBtn.addEventListener('click', toggleNav);
    }

    return () => {
      if (navBtn) {
        navBtn.removeEventListener('click', toggleNav);
      }
    };
  }, []);

  // Function to close mobile menu on link click
  const handleLinkClick = () => {
    const navList = document.querySelector('.nav_ul');
    if (navList && navList.classList.contains('active')) {
      navList.classList.remove('active');
    }
  };

  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="nav_title">
            <p>Trace</p>
          </div>
          <div className="nav_element">
            <ul className="nav_ul">
              <li>
                <Link 
                  to="/" 
                  onClick={() => handleLinkClick()}
                  className={activeLink === '/' ? 'active' : ''}
                >
                  <span className={activeLink === '/' ? 'active-span' : ''}>Home</span>
                </Link>
              </li> 
              <li>
                <Link 
                  to="/about" 
                  onClick={() => handleLinkClick()}
                  className={activeLink === '/about' ? 'active' : ''}
                >
                  <span className={activeLink === '/about' ? 'active-span' : ''}>About</span>
                </Link>
              </li> 
              <li>
                <Link 
                  to="/service" 
                  onClick={() => handleLinkClick()}
                  className={activeLink === '/service' ? 'active' : ''}
                >
                  <span className={activeLink === '/service' ? 'active-span' : ''}>Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/destination" 
                  onClick={() => handleLinkClick()}
                  className={activeLink === '/destination' ? 'active' : ''}
                >
                  <span className={activeLink === '/destination' ? 'active-span' : ''}>Destination</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => handleLinkClick()}
                  className={activeLink === '/contact' ? 'active' : ''}
                >
                  <span className={activeLink === '/contact' ? 'active-span' : ''}>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className='Header_Btns'>
            <i className="fa fa-bars" aria-hidden="true"></i> 
            <div className="dark-mode-toggle" onClick={toggleTheme}>
              <i className={iconClass} aria-hidden="true"></i>
            </div>
          </div>
       </div>
      </div>
    </header>
  );
};

export default Header;