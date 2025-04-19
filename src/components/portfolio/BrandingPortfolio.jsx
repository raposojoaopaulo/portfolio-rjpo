import { React, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/components/_Carousel.scss';
import { useTranslation } from 'react-i18next';

import OtohearLogo from '../../assets/portfolio/branding/otohear.webp';
import Wrd from '../../assets/portfolio/branding/wrd.webp';
import Bricoffee from '../../assets/portfolio/branding/bricoffee.webp';
import VerdeOliva from '../../assets/portfolio/branding/verde_oliva.webp';
import Optsun from '../../assets/portfolio/branding/optsun.webp';
import WillCarmo from '../../assets/portfolio/branding/willcarmo.webp';
import Conviccao from '../../assets/portfolio/branding/conviccao.webp';
import Santropez from '../../assets/portfolio/branding/santropez.webp';
import CarlosE from '../../assets/portfolio/branding/carlos_eduardo.webp';
import Divinas from '../../assets/portfolio/branding/divinas.webp';
import Stur from '../../assets/portfolio/branding/stur.webp';
import Lcf from '../../assets/portfolio/branding/lcf.webp';
import Mercosul from '../../assets/portfolio/branding/mercosul.webp';

import PreviousButton from '../../assets/portfolio/previous.svg';
import NextButton from '../../assets/portfolio/next.svg';

function BrandingPortfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 });
  const { t } = useTranslation();  

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  return (
        <div className="embla animate" id="logotipos">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              <div className="embla__slide">
                <img src={OtohearLogo} alt={t('portfolio.branding.case1.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case1.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case1.description')}</p>
                  <a href="https://www.behance.net/gallery/224035079/Apresentacao-Identidade-Visual-Otohear" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case1.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case1.description')}</p>
                  <a href="https://www.behance.net/gallery/224035079/Apresentacao-Identidade-Visual-Otohear" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Wrd} alt={t('portfolio.branding.case2.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case2.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case2.description')}</p>
                  <a href="https://www.behance.net/gallery/224034883/Identidade-Visual-WRD-Abrasivos" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case2.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case2.description')}</p>
                  <a href="https://www.behance.net/gallery/224034883/Identidade-Visual-WRD-Abrasivos" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Bricoffee} alt={t('portfolio.branding.case3.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case3.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case3.description')}</p>
                  <a href="https://www.behance.net/gallery/134365233/Identidade-Visual-Bricoffee" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case3.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case3.description')}</p>
                  <a href="https://www.behance.net/gallery/134365233/Identidade-Visual-Bricoffee" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={VerdeOliva} alt={t('portfolio.branding.case4.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case4.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case4.description')}</p>
                  <a href="https://www.behance.net/gallery/157050405/Manual-de-Marca-Verde-Oliva" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case4.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case4.description')}</p>
                  <a href="https://www.behance.net/gallery/157050405/Manual-de-Marca-Verde-Oliva" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Optsun} alt={t('portfolio.branding.case5.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case5.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case5.description')}</p>
                  <a href="https://www.behance.net/gallery/114748733/Identidade-Visual-OPTSUN-Energia-Solar" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case5.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case5.description')}</p>
                  <a href="https://www.behance.net/gallery/114748733/Identidade-Visual-OPTSUN-Energia-Solar" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={WillCarmo} alt={t('portfolio.branding.case6.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case6.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case6.description')}</p>
                  <a href="https://www.behance.net/gallery/78493573/Branding-Willian-do-Carmo" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case6.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case6.description')}</p>
                  <a href="https://www.behance.net/gallery/78493573/Branding-Willian-do-Carmo" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Conviccao} alt={t('portfolio.branding.case7.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case7.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case7.description')}</p>
                  <a href="https://www.behance.net/gallery/85882245/Criacao-de-Marca-Coniviccao-Kids-And-Teens" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case7.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case7.description')}</p>
                  <a href="https://www.behance.net/gallery/85882245/Criacao-de-Marca-Coniviccao-Kids-And-Teens" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Santropez} alt={t('portfolio.branding.case8.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case8.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case8.description')}</p>
                  <a href="https://www.behance.net/gallery/111363367/Identidade-Visual-Santropez-Creperia" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case8.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case8.description')}</p>
                  <a href="https://www.behance.net/gallery/111363367/Identidade-Visual-Santropez-Creperia" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={CarlosE} alt={t('portfolio.branding.case9.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case9.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case9.description')}</p>
                  <a href="https://www.behance.net/gallery/106819419/Branding-Carlos-Eduardo-Nutricionista" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case9.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case9.description')}</p>
                  <a href="https://www.behance.net/gallery/106819419/Branding-Carlos-Eduardo-Nutricionista" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Divinas} alt={t('portfolio.branding.case10.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case10.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case10.description')}</p>
                  <a href="https://www.behance.net/gallery/224034373/Rebranding-da-marca-Divinas" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case10.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case10.description')}</p>
                  <a href="https://www.behance.net/gallery/224034373/Rebranding-da-marca-Divinas" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Stur} alt={t('portfolio.branding.case11.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case11.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case11.description')}</p>
                  <a href="https://www.behance.net/gallery/78493783/Barnding-Eduardo-Sturmer" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case11.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case11.description')}</p>
                  <a href="https://www.behance.net/gallery/78493783/Barnding-Eduardo-Sturmer" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Lcf} alt={t('portfolio.branding.case12.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case12.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case12.description')}</p>
                  <a href="https://www.behance.net/gallery/134365785/Identidade-Visual-LCF" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case12.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case12.description')}</p>
                  <a href="https://www.behance.net/gallery/134365785/Identidade-Visual-LCF" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
                </div>
              </div>
              <div className="embla__slide">
                <img src={Mercosul} alt={t('portfolio.branding.case13.title')} />
                <div className="overlay">
                  <h4 className="overlay__title">{t('portfolio.branding.case13.title')}</h4>
                  <p className="overlay__description">{t('portfolio.branding.case13.description')}</p>
                  <a href="https://www.behance.net/gallery/157049575/Apresentacao-Logotipo-Mercosul-Solar" target="_blank" className="overlay__caseBtn">{t('portfolio.buttonCases')}</a>
                </div>
                <div className="mobile-info">
                  <h4 className="mobile-info__title">{t('portfolio.branding.case13.title')}</h4>
                  <p className="mobile-info__description">{t('portfolio.branding.case13.description')}</p>
                  <a href="https://www.behance.net/gallery/157049575/Apresentacao-Logotipo-Mercosul-Solar" target="_blank" className="btn">{t('portfolio.buttonCases')}</a>
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

export default BrandingPortfolio