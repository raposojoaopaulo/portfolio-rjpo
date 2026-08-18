import PortfolioShowcase from './PortfolioShowcase';

import OtohearNewSite from '../../assets/portfolio/code/otohear_new_site.webp';
import OtohearLp from '../../assets/portfolio/code/otohear_lp.webp';
import VOPI from '../../assets/portfolio/code/vopi.webp';
import OtohearSite from '../../assets/portfolio/code/otohear_site.webp';
import System from '../../assets/portfolio/code/system.webp';
import Afavorita from '../../assets/portfolio/code/lp_favorita.webp';
import JoaoBio from '../../assets/portfolio/code/joao_bio.webp';
import WillLp from '../../assets/portfolio/code/willian_lp.webp';
import NahaLp from '../../assets/portfolio/code/naha_lp.webp';

const codeCases = [
  {
    translationKey: 'portfolio.code.case9',
    image: NahaLp,
    href: 'https://nahatattoo.com.br/',
    variant: 'hero',
  },
  {
    translationKey: 'portfolio.code.case7',
    image: OtohearNewSite,
    href: 'https://otohear.com.br/',
    variant: 'tall',
  },
  {
    translationKey: 'portfolio.code.case8',
    image: WillLp,
    href: 'https://willcarmopersonal.com.br/',
  },
  {
    translationKey: 'portfolio.code.case10',
    image: JoaoBio,
    href: 'https://bio.joaochesca.com.br/',
  },
  {
    translationKey: 'portfolio.code.case1',
    image: OtohearLp,
    href: 'https://otohear.com.br/aparelhos-auditivos',
  },
  {
    translationKey: 'portfolio.code.case2',
    image: VOPI,
    href: 'https://vopi.com.br/',
    variant: 'wide',
  },
  {
    translationKey: 'portfolio.code.case3',
    image: OtohearSite,
    href: 'https://otohear.com.br/',
  },
  {
    translationKey: 'portfolio.code.case4',
    image: System,
    href: '#',
  },
  {
    translationKey: 'portfolio.code.case5',
    image: Afavorita,
    href: 'https://github.com/raposojoaopaulo/afavoritadu12',
    variant: 'wide',
  },
];

function CodePortfolio() {
  return <PortfolioShowcase items={codeCases} className="showcase--code" />;
}

export default CodePortfolio;
