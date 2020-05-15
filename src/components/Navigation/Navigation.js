import React from 'react';
import './Navigation.scss';
import {Link, Switch, Route} from 'react-router-dom';

const Navigation = ({place, setMenuShow, language}) => {

  const clickOnLink = () => {
    window.scrollTo(0,0)
    setMenuShow(false)
  }

  return (
    <nav className={`menu__nav ${place === 'footer' ? 'footer__nav' : null}`}>
      <Switch>
        <Route exact={true} path={`/${language === 'ua' ? 'ua' : ''}`}>
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Home" : "Головна"}</span>
        </Route>
          <Link  to={`/${language === 'ua' ? 'ua' : ''}`} className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Home" : "Головна"}</Link>
      </Switch>
      
      <Switch>
        <Route exact={true} path={`/${language === 'ua' ? 'ua/' : ''}about`}>
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "About" : "Про мене"}</span>
        </Route>
          <Link  to={`/${language === 'ua' ? 'ua/' : ''}about`} className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "About" : "Про мене"}</Link>
      </Switch>

      <Switch>
        <Route exact={true} path={`/${language === 'ua' ? 'ua/' : ''}works`}>
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Works" : "Роботи"}</span>
        </Route>
          <Link  to={`/${language === 'ua' ? 'ua/' : ''}works`} className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Works" : "Роботи"}</Link>
      </Switch>

      <Switch>
        <Route exact={true} path={`/${language === 'ua' ? 'ua/' : ''}sociality`}>
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Sociality" : "Соціальність"}</span>
        </Route>
          <Link  to={`/${language === 'ua' ? 'ua/' : ''}sociality`} className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Sociality" : "Соціальність"}</Link>
      </Switch>

      <Switch>
        <Route path={`/${language === 'ua' ? 'ua/' : ''}contacts`}>
          <span className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`}>{language === 'en' ? "Contacts" : "Контакти"}</span>
        </Route>
          <Link  to={`/${language === 'ua' ? 'ua/' : ''}contacts`} className={`menu__nav-link ${place === 'footer' ? 'footer__nav-link' : null}`} exact={true} onClick={clickOnLink}>{language === 'en' ? "Contacts" : "Контакти"}</Link>
      </Switch>
    </nav>
  );
}

export default React.memo(Navigation);
