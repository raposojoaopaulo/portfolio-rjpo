// import React from 'react';
import { React } from 'react';
import '../styles/pages/_Portfolio.scss';
import '../styles/components/_Carousel.scss';
import Header from '../components/Header';
import profilePortifolio from '../assets/portfolio/perfil_portfolio.webp';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import CodePortfolio from '../components/portfolio/CodePortfolio';
import BrandingPortfolio from '../components/portfolio/BrandingPortfolio';

const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header theme="dark" />
      <div className="portfolio">
        <div className="portfolio__image">
          <img src={profilePortifolio} alt="Logo João Paulo Raposo" />
        </div>
        <div className="portfolio__content">
          <h1 className="page-title animate">{t('portfolio.title')}</h1>
          <p className='portfolio__content-text animate' dangerouslySetInnerHTML={{ __html: t('portfolio.text') }} />
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <h3 className="portfolio__content-subtitle animate" dangerouslySetInnerHTML={{ __html: t('portfolio.subtitle1') }} />
          <CodePortfolio />
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <h3 className="portfolio__content-subtitle animate" dangerouslySetInnerHTML={{ __html: t('portfolio.subtitle2') }} />
          <BrandingPortfolio />
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <div className="back-button">
            <a href="/" className="back-home-btn">{t('construction.back')}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
