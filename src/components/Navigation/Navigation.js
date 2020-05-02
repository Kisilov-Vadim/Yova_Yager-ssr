import React from 'react';
import './Navigation.scss';
import {Link, Switch, Route} from 'react-router-dom';

const Navigation = ({place, showMenu, setMenuShow, language}) => {

  const clickOnLink = () => {
    window.scrollTo(0,0)
    setMenuShow(false)
  }

  return (
    <nav className={`menu__nav ${place === 'footer' ? 'footer__nav' : null}`}>
      <Switch>
        <Route exact={true} path="/">
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Home" : "Головна"}</span>
        </Route>
          <Link to='/' className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Home" : "Головна"}</Link>
      </Switch>
      <Switch>
        <Route exact={true} path="/about">
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "About" : "Про мене"}</span>
        </Route>
          <Link to='/about' className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "About" : "Про мене"}</Link>
      </Switch>
      <Switch>
        <Route exact={true} path="/works">
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Works" : "Роботи"}</span>
        </Route>
          <Link to='/works' className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Works" : "Роботи"}</Link>
      </Switch>
      <Switch>
        <Route exact={true} path="/sociality">
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Sociality" : "Соціальність"}</span>
        </Route>
          <Link to='/sociality' className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Sociality" : "Соціальність"}</Link>
      </Switch>

      {/* <a href="/" className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>Blog</a>
      <a href="/" className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>Career</a>
      <a href="/" className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>Media Kit</a>
      <a href="/" className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>Press</a> */}

      <Switch>
        <Route exact={true} path="/contacts">
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Contacts" : "Контакти"}</span>
        </Route>
          <Link to='/contacts' className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Contacts" : "Контакти"}</Link>
      </Switch>
    </nav>
  );
}

export default React.memo(Navigation);
