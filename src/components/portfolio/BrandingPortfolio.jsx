import PortfolioShowcase from './PortfolioShowcase';

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
import Tres from '../../assets/portfolio/branding/tres.webp';

const brandingCases = [
  {
    translationKey: 'portfolio.branding.case1',
    image: OtohearLogo,
    href: 'https://www.behance.net/gallery/224035079/Apresentacao-Identidade-Visual-Otohear',
    variant: 'hero',
  },
  {
    translationKey: 'portfolio.branding.case4',
    image: VerdeOliva,
    href: 'https://www.behance.net/gallery/157050405/Manual-de-Marca-Verde-Oliva',
  },
  {
    translationKey: 'portfolio.branding.case2',
    image: Wrd,
    href: 'https://www.behance.net/gallery/224034883/Identidade-Visual-WRD-Abrasivos',
  },
  {
    translationKey: 'portfolio.branding.case14',
    image: Tres,
    href: 'https://www.behance.net/gallery/245802253/Tres-Bussiness-Tech',
    variant: 'wide',
  },
  {
    translationKey: 'portfolio.branding.case3',
    image: Bricoffee,
    href: 'https://www.behance.net/gallery/134365233/Identidade-Visual-Bricoffee',
    variant: 'tall',
  },
  {
    translationKey: 'portfolio.branding.case5',
    image: Optsun,
    href: 'https://www.behance.net/gallery/114748733/Identidade-Visual-OPTSUN-Energia-Solar',
  },
  {
    translationKey: 'portfolio.branding.case6',
    image: WillCarmo,
    href: 'https://www.behance.net/gallery/78493573/Branding-Willian-do-Carmo',
  },
  {
    translationKey: 'portfolio.branding.case7',
    image: Conviccao,
    href: 'https://www.behance.net/gallery/85882245/Criacao-de-Marca-Coniviccao-Kids-And-Teens',
  },
  {
    translationKey: 'portfolio.branding.case8',
    image: Santropez,
    href: 'https://www.behance.net/gallery/111363367/Identidade-Visual-Santropez-Creperia',
    variant: 'wide',
  },
  {
    translationKey: 'portfolio.branding.case9',
    image: CarlosE,
    href: 'https://www.behance.net/gallery/106819419/Branding-Carlos-Eduardo-Nutricionista',
  },
  {
    translationKey: 'portfolio.branding.case10',
    image: Divinas,
    href: 'https://www.behance.net/gallery/224034373/Rebranding-da-marca-Divinas',
  },
  {
    translationKey: 'portfolio.branding.case11',
    image: Stur,
    href: 'https://www.behance.net/gallery/78493783/Barnding-Eduardo-Sturmer',
  },
  {
    translationKey: 'portfolio.branding.case12',
    image: Lcf,
    href: 'https://www.behance.net/gallery/134365785/Identidade-Visual-LCF',
  },
  {
    translationKey: 'portfolio.branding.case13',
    image: Mercosul,
    href: 'https://www.behance.net/gallery/157049575/Apresentacao-Logotipo-Mercosul-Solar',
  },
];

function BrandingPortfolio() {
  return <PortfolioShowcase items={brandingCases} className="showcase--design" />;
}

export default BrandingPortfolio;
