import '../styles/pages/_About.scss';
import profile from '../assets/about/profile_jp.webp'; 
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Ruby from '../assets/about/stacks/ruby.webp';
import Ror from '../assets/about/stacks/ror.webp';
import Php from '../assets/about/stacks/php.webp';
import Laravel from '../assets/about/stacks/laravel.webp';
import ApiLogo from '../assets/about/stacks/api.webp';
import ReactLogo from '../assets/about/stacks/react.webp';
import TsLogo from '../assets/about/stacks/ts.webp';
import JsLogo from '../assets/about/stacks/js.webp';
import HtmlLogo from '../assets/about/stacks/html.webp';
import CssLogo from '../assets/about/stacks/css.webp';
import tailwindLogo from '../assets/about/stacks/tailwind.webp';
import DockerLogo from '../assets/about/stacks/docker.webp';
import FigmaLogo from '../assets/about/stacks/figma.webp';
import Photoshop from '../assets/about/stacks/ps.webp';
import Illustrator from '../assets/about/stacks/ai.webp';


const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header theme="dark" />
      <div className="about">
        <div className="about__image">
        {/* <motion.img
          src={profile}
          alt="Foto de perfil de João Paulo Raposo"
          className="about__profile-img"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
        /> */}
        <motion.img
          src={profile}
          alt="Foto de perfil de João Paulo Raposo"
          className="about__profile-img"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -2, 0, 2, 0], // sobe e desce em looping
            x: [0, 1, 0, -1, 0], // leve oscilação lateral
          }}
          transition={{
            opacity: { duration: 1, ease: 'easeOut', delay: 0.3 },
            scale: { duration: 1, ease: 'easeOut', delay: 0.3 },
            y: {
              duration: 6,
              ease: 'easeInOut',
              repeat: Infinity,
            },
            x: {
              duration: 8,
              ease: 'easeInOut',
              repeat: Infinity,
            },
          }}
          whileHover={{ scale: 1.04 }}
        />
        </div>
        <div className="about__content">
          <h1 className="page-title animate">{ t('about.page-title') }</h1>
          <div className="description animate">
            <p>{ t('about.description') }</p>
            <p>{ t('about.description-2') }</p>
          </div>
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <h2 className="page-subtitle animate">{ t('about.page-subtitle') }</h2>
          <div className="stacks animate">
            <div className="stacks__item">
              <img src={Ruby} alt="Logo Ruby" />
            </div>
            <div className="stacks__item">
              <img src={Ror} alt="Logo Ruby on Rails" />
            </div>
            <div className="stacks__item">
              <img src={Php} alt="Logo PHP" />
            </div>
            <div className="stacks__item">
              <img src={Laravel} alt="Logo Laravel" />
            </div>
            <div className="stacks__item">
              <img src={ApiLogo} alt="Logo API Rest" />
            </div>
            <div className="stacks__item">
              <img src={ReactLogo} alt="Logo React" />
            </div>
            <div className="stacks__item">
              <img src={TsLogo} alt="Logo Typescript" />
            </div>
            <div className="stacks__item">
              <img src={JsLogo} alt="Logo Javascript" />
            </div>
            <div className="stacks__item">
              <img src={HtmlLogo} alt="Logo HTML" />
            </div>
            <div className="stacks__item">
              <img src={CssLogo} alt="Logo CSS" />
            </div>
            <div className="stacks__item">
              <img src={tailwindLogo} alt="Logo Tailwind css" />
            </div>
            <div className="stacks__item">
              <img src={DockerLogo} alt="Logo Docker" />
            </div>
            <div className="stacks__item">
              <img src={Illustrator} alt="Logo Illustrator" />
            </div>
            <div className="stacks__item">
              <img src={Photoshop} alt="Logo Photoshop" />
            </div>
            <div className="stacks__item">
              <img src={FigmaLogo} alt="Logo Figma" />
            </div>
          </div>
          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true }}
          />
          <h2 className="page-subtitle animate">{ t('about.page-subtitle2') }</h2>
          <div className="experiences animate">
            <div className="experiences__item">
              <div className="experiences__item-year">{ t('about.experiences.exp1.year') }</div>
              <div className="experiences__item-content">
                <h3>{ t('about.experiences.exp1.role') }</h3>
                <h4>{ t('about.experiences.exp1.company') }</h4>
                <p>{ t('about.experiences.exp1.description') }</p>
              </div>
            </div>
            <div className="experiences__item">
              <div className="experiences__item-year">{ t('about.experiences.exp2.year') }</div>
              <div className="experiences__item-content">
                <h3>{ t('about.experiences.exp2.role') }</h3>
                <h4>{ t('about.experiences.exp2.company') }</h4>
                <p>{ t('about.experiences.exp2.description') }</p>
              </div>
            </div>
            <div className="experiences__item">
              <div className="experiences__item-year">{ t('about.experiences.exp3.year') }</div>
              <div className="experiences__item-content">
                <h3>{ t('about.experiences.exp3.role') }</h3>
                <h4>{ t('about.experiences.exp3.company') }</h4>
                <p>{ t('about.experiences.exp3.description') }</p>
              </div>
            </div>
            <div className="experiences__item">
              <div className="experiences__item-year">{ t('about.experiences.exp4.year') }</div>
              <div className="experiences__item-content">
                <h3>{ t('about.experiences.exp4.role') }</h3>
                <h4>{ t('about.experiences.exp4.company') }</h4>
                <p>{ t('about.experiences.exp4.description') }</p>
              </div>
            </div>
            <div className="experiences__item">
              <div className="experiences__item-year">{ t('about.experiences.exp5.year') }</div>
              <div className="experiences__item-content">
                <h3>{ t('about.experiences.exp5.role') }</h3>
                <h4>{ t('about.experiences.exp5.company') }</h4>
                <p>{ t('about.experiences.exp5.description') }</p>
              </div>
            </div>
          </div>
          <motion.hr
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true }}
          />
          <div className="back-button">
            <a href="/" className="back-button__btn">{t('construction.back')}</a>
          </div>
        </div>      
      </div>
    </>
  );
};

export default About;
