import React from 'react';
import '../styles/pages/_UnderConstruction.scss';
import logo from '../assets/hero/logo-icon.svg';
import { FaInstagram, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const UnderConstruction = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Header theme="light" />
      <div className="under-construction">
        <img src={logo} alt="Joao Paulo Raposo Logo" className="logo" />

        <h1>{t('construction.title')}</h1>
        <p>{t('construction.message')}</p>

        <div className="social-icons">
          <a href="https://www.linkedin.com/in/raposojoaopaulo/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://github.com/raposojoaopaulo" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://behance.net/raposojoaop" target="_blank" rel="noopener noreferrer"><FaBehance /></a>
          <a href="https://instagram.com/raposojoaop" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        <a href="/" className="back-home-btn">{t('construction.back')}</a>
      </div>
    </>
  );
};

export default UnderConstruction;
