import Triangles from './Triangles';
import logo from '../assets/hero/logo.svg';
import logoMob from '../assets/hero/logo-mob.svg';
import '../styles/components/_hero.scss';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';


export default function Hero() {
  const { t } = useTranslation();
  
  return (
    <section className="hero">
      <Triangles />
      <div className="hero__content">
        <picture>
          <source media="(max-width: 768px)" srcSet={logoMob} />
          <img src={logo} alt="João Paulo Raposo" className="hero__content-logo" />
        </picture>
        <h1 className='hero__content-title'>JPRO Web Solutions</h1>
        <TypeAnimation
          sequence={[
            t('hero.subtitle'), 
            1000,               
          ]}
          wrapper="h2"
          className="hero__content-subtitle"
          cursor={true}
          speed={60}
        />
      </div>
    </section>
  );
}
