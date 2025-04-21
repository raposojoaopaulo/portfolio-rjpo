import { motion } from 'framer-motion';
import logo from '../assets/hero/logo.svg';
import logoMob from '../assets/hero/logo-mob.svg';

function Logo() {
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet={logoMob} />
      <motion.img
        src={logo}
        alt="João Paulo Raposo"
        className="hero__content-logo"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -3, 0, 3, 0],
          x: [0, 2, 0, -2, 0],
        }}
        transition={{
          opacity: { duration: 1, ease: 'easeOut', delay: 0.3 },
          scale:   { duration: 1, ease: 'easeOut', delay: 0.3 },
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
    </picture>
  );
}

export default Logo;
