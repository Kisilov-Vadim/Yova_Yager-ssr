import React, {useEffect} from 'react';
import "./Footer.scss";

import {Navigation} from '../Navigation/index';
import Social from '../Social/Social';

const Footer = ({language, allText}) => {

  return (
    <footer className='footer' id="footer">
      <div className="wrapper">
        <h2 className="footer__title">{language === 'en' ? allText.footer_title_en : allText.footer_title_ua}</h2>
        <div className="footer__content">
          <div className="footer__content-left">
            <span className="footer__content-name" itemProp="author">{language === 'en' ? allText.footer_withPhoto_en : allText.footer_withPhoto_ua}</span>
            <img className="footer__content-imageFace" src="/img/footer/YY-10.png" alt="Yova" />
          </div>
          <div className="footer__content-right">
            <div className="footer__content-right-info">
              <div className="footer__content-contacts">
                <span>{language === 'en' ? allText['footer_mail-title_en'] : allText['footer_mail-title_ua']}</span>
                {
                  allText['footer_mail-text_en'].split('\n').map(item =>
                    <a key={item} href={`mailto:${item}`}>{item}</a>
                  )
                }
                <span className="second-span">{language === 'en' ? allText['footer_call-title_en'] : allText['footer_call-title_ua']}</span>
                {
                  allText['footer_call-text_en'].split('\n').map(item =>
                    <a key={item} href={`tel:${item.split(': ')[1]}`}>{item}</a>
                  )
                }

              </div>
              <div className="footer__content-sendmail">
                <span>{language === 'en' ? allText['footer_post-title_en'] : allText['footer_post-title_ua']}</span>
                <p>{language === 'en' ? allText['footer_post-text_en'] : allText['footer_post-text_ua']}</p>
                <div className="footer__social">
                  <Social place='footer' />
                </div>
              </div>
            </div>
            <div className="footer__menu">
              <Navigation place='footer' />
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <span>
            © {new Date().getFullYear()} Yova Yager. All rights reserved.
          </span>
          <span>
            Made with
            <img src="/img/footer/heart.svg" alt="heart" />
          </span>
          <span>
            Designed by
            <img src="/img/footer/logo_HETMANZ.svg" alt="HETMANZ" />
          </span>
          <a href="https://amsg.com.ua" target="_blank">
            Developed by
            <img src="/img/footer/logo_amsg.svg" alt="AMSG" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
