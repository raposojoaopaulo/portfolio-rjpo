import '../styles/pages/_Portfolio.scss';
import '../styles/components/_Carousel.scss';
import Header from '../components/Header';
import profilePortifolio from '../assets/portfolio/perfil_portfolio.webp';
import { FaGithub, FaBehance } from 'react-icons/fa';
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
          <h3 className="portfolio__content-subtitle animate">{t('portfolio.subtitle1')}</h3>
          <CodePortfolio />
          <h3 className="portfolio__content-subtitle animate">{t('portfolio.subtitle3')}</h3>
          <div className="see-more end animate">
            <p>{t('portfolio.see-more1')}</p>
            <a href="https://github.com/raposojoaopaulo" target="_blank" rel="noopener noreferrer" className="see-more__btn">{ t('portfolio.externalButton') } <span><FaGithub /></span></a>
          </div>
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <h3 className="portfolio__content-subtitle animate" dangerouslySetInnerHTML={{ __html: t('portfolio.subtitle2') }} />
          <BrandingPortfolio />
          <div className="see-more animate">
          <p>{t('portfolio.see-more2')}</p>
            <a href="https://behance.net/raposojoaop" target="_blank" rel="noopener noreferrer" className="see-more__btn">{ t('portfolio.externalButton') } <span><FaBehance /></span></a>
          </div>
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
