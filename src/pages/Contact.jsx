// import React from 'react';
import { React, useRef, useState, useEffect } from 'react';
import '../styles/pages/_Contact.scss';
import Header from '../components/Header';
import logoImage from '../assets/contact/contact_bg.webp';
import { FaInstagram, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import IMask from 'imask';
// import { useRef, useState } from 'react';

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const name = form['user_name'].value.trim();
    const email = form['user_email'].value.trim();
    const phone = form['user_phone'].value.trim();
    const message = form['message'].value.trim();

    const newFieldsErrors = {};

    if (!name) newFieldsErrors.user_name = `${t('contact.errors.name')}`;
    if (!email) newFieldsErrors.user_email = `${t('contact.errors.email')}`;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newFieldsErrors.user_email = `${t('contact.errors.email-valid')}`;
    if (!phone) newFieldsErrors.user_phone = `${t('contact.errors.phone')}`;

    const rawPhone = phone.replace(/\D/g, '');
    if (!rawPhone) {
      newFieldsErrors.user_phone = `${t('contact.errors.phone-invalid')}`;
    } else if (rawPhone.length < 10 || rawPhone.length > 11) {
      newFieldsErrors.user_phone = `${t('contact.errors.phone-invalid')}`;
    }

    if (!message) newFieldsErrors.message = `${t('contact.errors.message')}`;
    
    setFieldError(newFieldsErrors);

    if (Object.keys(newFieldsErrors).length > 0) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs.sendForm('service_l3xmli2', 'template_5cqx10i', form, 'jx_bAilgtxFDfFQZI')
    .then((result) => {
        console.log(result.text);
        setSuccess(true);
        setLoading(false);
        form.reset();
        setFieldError({});
    }, (error) => {
        console.error(error.text);
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

  useEffect(() => {
    const phoneInput = document.querySelector('input[name="user_phone"]');
    if (phoneInput) {
      IMask(phoneInput, {
        mask: [
          {
            mask: '(00) 0000-0000',
            lazy: true,
            condition: (value) => value.replace(/\D/g, '').length <= 10,
          },
          {
            mask: '(00) 0 0000-0000',
            lazy: true,
          }
        ],
        dispatch: function (appended, dynamicMasked) {
          const number = (dynamicMasked.value + appended).replace(/\D/g, '');
          if (number.length > 10) {
            return dynamicMasked.compiledMasks[1];
          } else {
            return dynamicMasked.compiledMasks[0];
          }
        }
      });
    }
  }, []);  

  return (
    <>
      <Header theme="dark-and-light" />
      <div className="contact">
        <div className="contact__image">
          <img src={logoImage} alt="Logo João Paulo Raposo" />
        </div>
        <div className="contact__content">
          <h1 className="page-title animate">{t('contact.title')}</h1>
          <h2 className='contact__content-text animate' dangerouslySetInnerHTML={{ __html: t('contact.text') }} />
          {loading && (
            <div className="contact__content-message loading">
              <p>Enviando sua mensagem...</p>
            </div>
          )}
          {!loading && !success && !error && (
            <form ref={formRef} onSubmit={sendEmail} className="contact__content-form animate">
              <label>
                <span>{t('contact.name')}</span>
                <input type="text" name="user_name" placeholder={t('contact.placeholder-name')} className={fieldError.user_name ? 'input-error' : ''} onChange={handleChange}/>
                {fieldError.user_name && <span className="error-text">{fieldError.user_name}</span>}
              </label>
              <label>
                <span>{t('contact.email')}</span>
                <input type="email" name="user_email" placeholder={t('contact.placeholder-email')} className={fieldError.user_email ? 'input-error' : ''} onChange={handleChange}/>
                {fieldError.user_email && <span className="error-text">{fieldError.user_email}</span>}
              </label>
              <label>
                <span>{t('contact.phone')}</span>
                <input type="tel" name="user_phone" placeholder={t('contact.placeholder-phone')} className={fieldError.user_phone ? 'input-error' : ''} onChange={handleChange}/>
                {fieldError.user_phone && <span className="error-text">{fieldError.user_phone}</span>}
              </label>
              <label>
                <span>{t('contact.message')}</span>
                <textarea rows="5" name="message" placeholder={t('contact.placeholder-message')} className={fieldError.message ? 'input-error' : ''} onChange={handleChange}/>
                {fieldError.message && <span className="error-text">{fieldError.message}</span>}
              </label>
              <button type="submit">{t('contact.send')}</button>
            </form>
          )}
          {success && (
            <div className="contact__content-message success">
              <p>✅ Sua mensagem foi enviada com sucesso!</p>
              <a href="/" className="back-button__btn">Voltar para o início</a>
            </div>
          )}
          {error && (
            <div className="contact__content-message error">
              <p>❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.</p>
              <a href="/" className="back-button__btn">Voltar para o início</a>
            </div>
          )}
          <div className="contact__content-socials animate">
            <h2 className='contact__content-text'>{t('contact.text2')}</h2>
            <div className="links">
              <a href="https://www.linkedin.com/in/raposojoaopaulo/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://github.com/raposojoaopaulo" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://behance.net/raposojoaop" target="_blank" rel="noopener noreferrer"><FaBehance /></a>
              <a href="https://instagram.com/raposojoaop" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
          <motion.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <div className="back-button">
            <a href="/" className="back-button__btn">{t('construction.back')}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
