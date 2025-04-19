import { React, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/components/_Carousel.scss';
import { useTranslation } from 'react-i18next';

import PreviousButton from '../../assets/portfolio/previous.svg';
import NextButton from '../../assets/portfolio/next.svg';

import OtohearLp from '../../assets/portfolio/code/otohear_lp.webp';
import VOPI from '../../assets/portfolio/code/vopi.webp';
import OtohearSite from '../../assets/portfolio/code/otohear_site.webp';
import System from '../../assets/portfolio/code/system.webp';
import Afavorita from '../../assets/portfolio/code/lp_favorita.webp';
import Pokedash from '../../assets/portfolio/code/pokedash.webp';

function CodePortfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 }); 
  const { t } = useTranslation(); 

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="embla animate">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src={OtohearLp} alt={t('portfolio.code.case1.title')} />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case1.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case1.description')}</p>
              <a href="#" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
              <h4 className="mobile-info__title">{t('portfolio.code.case1.title')}</h4>
              <p className="mobile-info__description">{t('portfolio.code.case1.description')}</p>
              <a href="#" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
          <div className="embla__slide">
            <img src={VOPI} alt="Projeto VOPI" />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case2.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case2.description')}</p>
              <a href="https://vopi.com.br/" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
            <h4 className="mobile-info__title">{t('portfolio.code.case2.title')}</h4>
            <p className="mobile-info__description">{t('portfolio.code.case2.description')}</p>
              <a href="https://vopi.com.br/" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
          <div className="embla__slide">
            <img src={OtohearSite} alt="Site Otohear" />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case3.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case3.description')}</p>
              <a href="https://otohear.com.br/" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
            <h4 className="mobile-info__title">{t('portfolio.code.case3.title')}</h4>
            <p className="mobile-info__description">{t('portfolio.code.case3.description')}</p>
              <a href="https://otohear.com.br/" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
          <div className="embla__slide">
            <img src={System} alt="Sistem juridico" />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case4.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case4.description')}</p>
              <a href="#" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
            <h4 className="mobile-info__title">{t('portfolio.code.case4.title')}</h4>
            <p className="mobile-info__description">{t('portfolio.code.case4.description')}</p>
              <a href="#" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
          <div className="embla__slide">
            <img src={Afavorita} alt="Landing page loja A Favorita" />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case5.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case5.description')}</p>
              <a href="https://github.com/raposojoaopaulo/afavoritadu12" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
            <h4 className="mobile-info__title">{t('portfolio.code.case5.title')}</h4>
            <p className="mobile-info__description">{t('portfolio.code.case5.description')}</p>
              <a href="https://github.com/raposojoaopaulo/afavoritadu12"  target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
          <div className="embla__slide">
            <img src={Pokedash} alt="Projeto Pokedash" />
            <div className="overlay">
            <h4 className="overlay__title">{t('portfolio.code.case6.title')}</h4>
            <p className="overlay__description">{t('portfolio.code.case6.description')}</p>
              <a href="https://funny-sawine-1798f0.netlify.app/"  target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
            </div>
            <div className="mobile-info">
            <h4 className="mobile-info__title">{t('portfolio.code.case6.title')}</h4>
            <p className="mobile-info__description">{t('portfolio.code.case6.description')}</p>
              <a href="https://funny-sawine-1798f0.netlify.app/" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
            </div>
          </div>
        </div>
      </div>
      <button className="embla__button embla__button--prev" onClick={scrollPrev}>
        <img src={PreviousButton} alt="Previous" />
      </button>

      <button className="embla__button embla__button--next" onClick={scrollNext}>
        <img src={NextButton} alt="Next" />
      </button>

    </div>
  )
}

export default CodePortfolio