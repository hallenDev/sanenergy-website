import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './pages/Home';
import WhitePaper from './pages/WhitePaper';
import Header from './components/Header';
import Footer from './components/Footer';
import DApp from './pages/DApp';
import DAppHeader from './components/DAppHeader';

const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (window.location.pathname === "/app") {
    return (
      <React.Fragment>
        <div className="app">
          <DAppHeader />
          <Switch>
            <Route exact path="/app" component={DApp} />
            <Redirect from='/' to='/' />
          </Switch>
          <Footer />
          {showButton && (
            <div onClick={scrollToTop} className="back-to-top">
              <BsFillArrowUpCircleFill className='cl-brown' />
            </div>
          )}
          <ToastContainer theme='colored' />
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/whitepaper" component={WhitePaper} />
            <Redirect from='/' to='/' />
          </Switch>
          <Footer />
          {showButton && (
            <div onClick={scrollToTop} className="back-to-top">
              <BsFillArrowUpCircleFill className='cl-brown' />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default (withRouter(App));