import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import { useTranslation } from 'react-i18next';

const SignIn = React.lazy(() => import('./pages/SignIn'));
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const SignOut = React.lazy(() => import('./pages/SignOut'));
const Home = React.lazy(() => import('./pages/Home'));
const Visit = React.lazy(() => import('./pages/Visit'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Terms = React.lazy(() => import('./pages/Terms'));

export default function App() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(localStorage['lang'] || i18n.resolvedLanguage);

  useEffect(() => {
    localStorage['lang'] = lang;
    i18n.changeLanguage(lang, (err, t) => {
      if (err) return console.log('something went wrong loading', err);
    });
  }, [lang]);

  // Authorization
  const [a14n, setA14n] = useState(function() {
    const state = {
      token: '',
      name:  '',
    }
    if (sessionStorage['token']) {
      state.token = sessionStorage['token'];
      state.name = sessionStorage['name'];
    }
    else if (localStorage['token']) {
      state.token = localStorage['token'];
      state.name = localStorage['name'];
      state.remember = true;
    }
    return state;
  });

  useEffect(() => {
    console.log('a14n', a14n);
    if (a14n.remember) {
      localStorage['token'] = a14n.token;
      localStorage['name'] = a14n.name;
    }
    else {
      sessionStorage['token'] = a14n.token;
      sessionStorage['name'] = a14n.name;
    }
  }, [a14n]);

  return (
    <Suspense fallback={<div>Loading...</div>} lang="lang">
      <Routes>
        <Route path="/" element={<Layout lang={lang} setLang={setLang} i18next={i18n} t={t} a14n={a14n} />}>
          <Route index element={<Home lang={lang} t={t} />} />
          <Route path="sign-in" element={<SignIn lang={lang} t={t} a14n={a14n} setA14n={setA14n} />} />
          <Route path="password-reset" element={<PasswordReset lang={lang} t={t} />} />
          <Route path="sign-up" element={<SignUp lang={lang} i18next={i18n} a14n={a14n} t={t} />} />
          <Route path="sign-out" element={<SignOut lang={lang} t={t} a14n={a14n} setA14n={setA14n} />} />

          <Route path="visit" element={<Visit lang={lang} t={t} />} />
          <Route path="faq" element={<Faq lang={lang} />} t={t} />
          <Route path="terms" element={<Terms lang={lang} t={t} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}