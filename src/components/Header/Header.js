import React, {useState, useEffect} from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery'

import {SliderMenu} from '../SliderMenu/index';
import {SelectLanguage} from '../SelectLanguage/index';

const Header = ({menuShow, setMenuShow, setScreenWidth, screenWidth, language}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const getScrollPosition = () => {
    setScrollPosition(window.pageYOffset)
  }

  const unShowMenu = (e) => {
    if (e.target.className === 'menu__front') {
      setMenuShow(false);
    }
  }

  const resize = () => {
    setScreenWidth($(window).width())
  }

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', getScrollPosition)
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize);

    return () => {
      window.removeEventListener('scroll', getScrollPosition);
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize);
    }
  })

  if (menuShow) {
    $('body').css('overflow', 'hidden')
    $('.menu__front').css('display', 'block')
  } else {
    $('body').css('overflow', 'auto')
    $('.menu__front').css('display', 'none')
  }

  const clickOnLink = () => {
    setMenuShow(false)
    window.scrollTo(0,0)
  }

  return (
    <>
      <header
        data-test="mainHeader"
        className="header"
        id="header"
      >
        <div className="wrapper">
          <div
            className={`header__wrapper
            ${scrollPosition > 0 ? 'header-scroll' : null}
            `}
          >
            <div className="header__atmosphere">
              {
                scrollPosition > 0 || screenWidth < 949
                  ?
                    <Switch>
                      <Route exact={true} path={`/${language === 'ua' ? 'ua' : ''}`}>
                        <img className="header__atmosphere-YY" src="/img/header/YY.svg" alt="YY" />
                      </Route>
                        <Link to={`/${language === 'ua' ? 'ua' : ''}`} exact={true} onClick={clickOnLink} className="header__atmosphere-YY">
                          <img src="/img/header/YY.svg" alt="YY" style={{cursor: 'pointer'}} />
                        </Link>
                    </Switch>
                  :
                    <>
                      <div className="header__atmosphere-hospitality">
                        <span>HOSPITALITY</span>
                      </div>
                      <div className="header__atmosphere-design">
                        <span>DESIGN</span>
                      </div>
                    </>
              }
            </div>
              <Switch>
                <Route exact={true} path={`/${language === 'ua' ? 'ua' : ''}`}>
                  <span className="header__logo">YOVA YAGER</span>
                </Route>
                  <Link 
                    to={`/${language === 'ua' ? 'ua' : ''}`} 
                    className="header__logo" 
                    exact={true} 
                    onClick={clickOnLink}
                  >
                    YOVA YAGER
                  </Link>
              </Switch>
            <div className="header__info">
              {/* <HeaderSearch /> */}
              <SelectLanguage />
              <div
                className={`header__info-burger ${menuShow === true ? "header__info-burger-show" : null}`}
                onClick={() => setMenuShow(!menuShow)}
              >
                <span/>
                <span/>
              </div>
            </div>
          </div>
          <SliderMenu scrollPosition={scrollPosition} unShowMenu={unShowMenu} />
        </div>
      </header>
    </>
  );
}

export default Header;
