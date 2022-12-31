import React, {Suspense} from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout'

const SignIn = React.lazy(() => import('./pages/SignIn'));
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Home = React.lazy(() => import('./pages/Home'));
const Visit = React.lazy(() => import('./pages/Visit'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Terms = React.lazy(() => import('./pages/Terms'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="visit" element={<Visit />} />
          <Route path="faq" element={<Faq />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </Suspense>
  );
}