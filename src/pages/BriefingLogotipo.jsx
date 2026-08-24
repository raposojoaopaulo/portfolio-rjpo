import { React, useRef, useState } from 'react';
import '../styles/pages/_BriefingLogotipo.scss';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import useNoIndex from '../hooks/useNoIndex';
import logoIcon from '../assets/hero/logo-icon.svg';

const PERSONALITY_OPTIONS = [
  'seria', 'conservadora', 'corporativa', 'dinamica',
  'elegante', 'ecologica', 'ludica', 'moderna',
  'amigavel', 'divertida', 'honesta', 'hightech',
  'simples', 'tradicional',
];

const STYLE_OPTIONS = [
  'icone-abstrato', 'icone-figurativo', 'escudo-emblema',
  'apenas-texto', 'icone-e-texto', 'sem-preferencia',
];

const BriefingLogotipo = () => {
  const { t } = useTranslation();
  const formRef = useRef();
  const summaryRef = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fieldError, setFieldError] = useState({});

  useNoIndex('Briefing de Logotipo | João Paulo Raposo');

  const buildSummary = (form) => {
    const val = (name) => (form[name]?.value || '').trim();

    const checkedValues = (name) =>
      Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);

    const personality = checkedValues('personality');
    const personalityOther = val('personality_other');
    if (personalityOther) personality.push(personalityOther);

    const style = checkedValues('logo_style');

    const publicoAlvo = form.querySelector('input[name="publico_alvo"]:checked')?.value || '';

    const lines = [
      ['1) Como descreveria seus produtos e/ou serviços?', val('q1_produtos_servicos')],
      ['2) Quais são os objetivos a longo prazo?', val('q2_objetivos')],
      ['3) Possui um logo antigo? Qual o motivo da mudança?', val('q3_logo_antigo')],
      ['4) Quais são seus principais concorrentes?', val('q4_concorrentes')],
      ['5) Como se difere dos concorrentes?', val('q5_diferencial')],
      ['6) Quem são seus clientes? (classe social, região, idade, sexo)', val('q6_clientes')],
      ['7) Público-alvo', publicoAlvo],
      ['8) Nome da marca', val('q8_nome_marca')],
      ['9) Slogan / tagline', val('q9_slogan')],
      ['9.1) Quer o slogan presente no logo?', form.querySelector('input[name="slogan_no_logo"]')?.checked ? 'Sim' : 'Não'],
      ['10) Imagem em mente para o logo', val('q10_imagem_mente')],
      ['11) Preferência de cores', val('q11_cores_desejadas')],
      ['12) Cores a evitar', val('q12_cores_evitar')],
      ['13) Características/adjetivos desejados', val('q13_atributos')],
      ['14) Personalidade da marca', personality.join(', ')],
      ['16) Estilo do logo', style.join(', ')],
      ['17) Tipografia / imagem-ícone a incorporar', val('q17_tipografia')],
      ['18) Referências de logos (3 exemplos, links)', val('q18_referencias')],
    ];

    return lines
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}\n${value}`)
      .join('\n\n');
  };

  const sendBriefing = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form['from_name'].value.trim();
    const email = form['from_email'].value.trim();

    const newFieldsErrors = {};
    if (!name) newFieldsErrors.from_name = t('briefing.errors.name');
    if (!email) newFieldsErrors.from_email = t('briefing.errors.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newFieldsErrors.from_email = t('briefing.errors.email-invalid');

    setFieldError(newFieldsErrors);
    if (Object.keys(newFieldsErrors).length > 0) return;

    summaryRef.current.value = buildSummary(form);

    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs.sendForm('service_l3xmli2', 'template_6u6qdi7', form, 'jx_bAilgtxFDfFQZI')
      .then(() => {
        setSuccess(true);
        setLoading(false);
        form.reset();
        setFieldError({});
      }, (err) => {
        console.error(err.text);
        setError(true);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (fieldError[name] && value.trim() !== '') {
      setFieldError((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <>
      <Header />
      <div className="briefing">
        <div className="briefing__content">
          <h1 className="page-title animate">{t('briefing.title')}</h1>
          <p className="briefing__content-text animate">{t('briefing.intro')}</p>
          <p className="briefing__content-note animate">{t('briefing.note')}</p>

          {loading && (
            <div className="briefing__content-message loading">
              <p>{t('briefing.sending')}</p>
            </div>
          )}

          {!loading && !success && !error && (
            <form ref={formRef} onSubmit={sendBriefing} className="briefing__content-form animate">
              <textarea ref={summaryRef} name="briefing_summary" style={{ display: 'none' }} readOnly />

              <fieldset className="briefing__fieldset">
                <legend>{t('briefing.contact-section-title')}</legend>

                <label>
                  <span>{t('briefing.name')}</span>
                  <input type="text" name="from_name" placeholder={t('briefing.placeholder-name')} className={fieldError.from_name ? 'input-error' : ''} onChange={handleChange} />
                  {fieldError.from_name && <span className="error-text">{fieldError.from_name}</span>}
                </label>

                <label>
                  <span>{t('briefing.email')}</span>
                  <input type="email" name="from_email" placeholder={t('briefing.placeholder-email')} className={fieldError.from_email ? 'input-error' : ''} onChange={handleChange} />
                  {fieldError.from_email && <span className="error-text">{fieldError.from_email}</span>}
                </label>
              </fieldset>

              <fieldset className="briefing__fieldset briefing__fieldset--questions">
                <legend>{t('briefing.section1-title')}</legend>

                <label>
                  <span>{t('briefing.q1.label')}</span>
                  <textarea rows="3" name="q1_produtos_servicos" placeholder={t('briefing.q1.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q2.label')}</span>
                  <textarea rows="3" name="q2_objetivos" placeholder={t('briefing.q2.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q3.label')}</span>
                  <textarea rows="3" name="q3_logo_antigo" placeholder={t('briefing.q3.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q4.label')}</span>
                  <textarea rows="3" name="q4_concorrentes" placeholder={t('briefing.q4.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q5.label')}</span>
                  <textarea rows="3" name="q5_diferencial" placeholder={t('briefing.q5.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q6.label')}</span>
                  <textarea rows="3" name="q6_clientes" placeholder={t('briefing.q6.placeholder')} />
                </label>

                <div className="briefing__radio-group">
                  <span>{t('briefing.q7.label')}</span>
                  <label className="briefing__radio"><input type="radio" name="publico_alvo" value={t('briefing.q7.option-b2c')} /> {t('briefing.q7.option-b2c')}</label>
                  <label className="briefing__radio"><input type="radio" name="publico_alvo" value={t('briefing.q7.option-b2b')} /> {t('briefing.q7.option-b2b')}</label>
                  <label className="briefing__radio"><input type="radio" name="publico_alvo" value={t('briefing.q7.option-both')} /> {t('briefing.q7.option-both')}</label>
                </div>
              </fieldset>

              <fieldset className="briefing__fieldset briefing__fieldset--questions">
                <legend>{t('briefing.section2-title')}</legend>

                <label>
                  <span>{t('briefing.q8.label')}</span>
                  <input type="text" name="q8_nome_marca" placeholder={t('briefing.q8.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q9.label')}</span>
                  <input type="text" name="q9_slogan" placeholder={t('briefing.q9.placeholder')} />
                </label>
                <label className="briefing__checkbox">
                  <input type="checkbox" name="slogan_no_logo" />
                  <span>{t('briefing.q9.checkbox')}</span>
                </label>

                <label>
                  <span>{t('briefing.q10.label')}</span>
                  <textarea rows="3" name="q10_imagem_mente" placeholder={t('briefing.q10.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q11.label')}</span>
                  <textarea rows="2" name="q11_cores_desejadas" placeholder={t('briefing.q11.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q12.label')}</span>
                  <textarea rows="2" name="q12_cores_evitar" placeholder={t('briefing.q12.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q13.label')}</span>
                  <textarea rows="2" name="q13_atributos" placeholder={t('briefing.q13.placeholder')} />
                </label>

                <div className="briefing__checkbox-group">
                  <span>{t('briefing.q14.label')}</span>
                  <div className="briefing__checkbox-grid">
                    {PERSONALITY_OPTIONS.map((option) => (
                      <label className="briefing__checkbox" key={option}>
                        <input type="checkbox" name="personality" value={t(`briefing.q14.options.${option}`)} />
                        <span>{t(`briefing.q14.options.${option}`)}</span>
                      </label>
                    ))}
                  </div>
                  <label>
                    <span>{t('briefing.q14.other-label')}</span>
                    <input type="text" name="personality_other" placeholder={t('briefing.q14.other-placeholder')} />
                  </label>
                </div>

                <div className="briefing__checkbox-group">
                  <span>{t('briefing.q16.label')}</span>
                  <div className="briefing__checkbox-grid">
                    {STYLE_OPTIONS.map((option) => (
                      <label className="briefing__checkbox" key={option}>
                        <input type="checkbox" name="logo_style" value={t(`briefing.q16.options.${option}`)} />
                        <span>{t(`briefing.q16.options.${option}`)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label>
                  <span>{t('briefing.q17.label')}</span>
                  <textarea rows="3" name="q17_tipografia" placeholder={t('briefing.q17.placeholder')} />
                </label>

                <label>
                  <span>{t('briefing.q18.label')}</span>
                  <textarea rows="3" name="q18_referencias" placeholder={t('briefing.q18.placeholder')} />
                </label>
              </fieldset>

              <button type="submit">{t('briefing.send')}</button>
            </form>
          )}

          {success && (
            <div className="briefing__content-message success">
              <p>{t('briefing.success')}</p>
              <a href="/" className="back-button__btn">{t('briefing.back')}</a>
            </div>
          )}

          {error && (
            <div className="briefing__content-message error">
              <p>{t('briefing.error')}</p>
              <a href="/" className="back-button__btn">{t('briefing.back')}</a>
            </div>
          )}

          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
        </div>
      </div>

      <footer className="briefing__footer">
        <img src={logoIcon} alt="João Paulo Raposo" />
        <p className="briefing__footer-rights">© {new Date().getFullYear()} João Paulo Raposo. {t('briefing.footer.rights')}</p>
      </footer>
    </>
  );
};

export default BriefingLogotipo;
