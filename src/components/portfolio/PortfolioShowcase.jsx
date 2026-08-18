import { useTranslation } from 'react-i18next';

function PortfolioShowcase({ items, className = '' }) {
  const { t } = useTranslation();

  return (
    <div className={`showcase animate ${className}`.trim()}>
      <div className="showcase__grid">
        {items.map((item) => {
          const cardClassName = item.variant
            ? `showcase-card showcase-card--${item.variant}`
            : 'showcase-card';
          const isDisabled = !item.href || item.href === '#';

          return (
            <article className={cardClassName} key={item.translationKey}>
              <div className="showcase-card__media">
                <img src={item.image} alt={t(`${item.translationKey}.title`)} />
              </div>
              <div className="showcase-card__content">
                <h4 className="showcase-card__title">{t(`${item.translationKey}.title`)}</h4>
                <p className="showcase-card__description">{t(`${item.translationKey}.description`)}</p>
                {isDisabled ? (
                  <span className="showcase-card__button showcase-card__button--disabled">
                    {t('portfolio.buttonCases')}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-card__button"
                  >
                    {t('portfolio.buttonCases')}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioShowcase;
