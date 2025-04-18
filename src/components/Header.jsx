import React, { useState } from 'react';
import '../styles/components/_header.scss';
import menuIcon from '../assets/header/menu_icon_open.svg';
import closeIcon from '../assets/header/menu_icon_close.svg';
import { FaInstagram, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Header({ theme = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsOpen((o) => !o);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  return (
    <>
       <header className={`header ${theme} ${isOpen ? 'open' : ''}`}>
        <div className="container">
          <div className="header__languages">
            <button className="header__language-button" onClick={() => changeLanguage('pt')}>
              BR
            </button>
            /
            <button className="header__language-button" onClick={() => changeLanguage('en')}>
              EN
            </button>
          </div>

          <button
            className="header__menu-btn"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'MENU' : t('menu.open')}
          >
            <span className="header__menu-text">
              {isOpen ? t('menu.close') : 'MENU'}
            </span>
            <img
              src={isOpen ? closeIcon : menuIcon}
              alt=""
              className="header__menu-icon"
            />
          </button>
        </div>
      </header>

      <div className={`header__overlay ${isOpen ? 'open' : ''} ${theme}`}>
        <nav className="header__nav">
          <ul>
            <li><a href="/sobre-mim" onClick={toggleMenu}>{t('menu.about')}</a></li>
            <li><a href="/em-construcao" onClick={toggleMenu}>{t('menu.portfolio')}</a></li>
            <li><a href="/contato" onClick={toggleMenu}>{t('menu.contact')}</a></li>
          </ul>
        </nav>

        <div className="header__social">
          <a href="https://www.linkedin.com/in/raposojoaopaulo/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://github.com/raposojoaopaulo" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://behance.net/raposojoaop" target="_blank" rel="noopener noreferrer"><FaBehance /></a>
          <a href="https://instagram.com/raposojoaop" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </>
  );
}
