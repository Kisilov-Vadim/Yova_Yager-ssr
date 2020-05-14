import React, {useEffect} from 'react'
import './Contact.scss'
import {MetaTags} from 'react-meta-tags';

//import Components
import Preloader from '../../components/Preloader/Preloader';
import {MainWaveAnimatione} from '../../components/MainWaveAnimation/index';

//import Redux actions
import {getData, getToken} from '../../store/actions';


const Contact = ({language, setContactPage, contactPage}) => {

  if (!contactPage) {
    return (
      <Preloader />
    )
  } else {
    return (
      <>
        <MetaTags>
          <title>{contactPage.meta_title}</title>
					<meta name="description" content={contactPage.meta_description} />
					<meta property="og:image" content={contactPage.meta_image} />
        </MetaTags>
        <section className="contact">
         <div className="wrapper">
          <h1 className="contact__title">{language === 'en' ? "Contacts" : "Контакти"}</h1>
          <div className="contact__info">
            <div className="contact__info-content">
              <table>
                <tr>
                  <th>
                    {language === 'en' ? 'E-mail' : 'Пошта'}
                  </th>
                  <td>
                    <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
                  </td>
                </tr>
                <tr className="telephone">
                  <th>
                    {language === 'en' ? 'Phone Numbers' : 'Номера телефонів'}
                  </th>
                  <td>
                    {
                      contactPage.phone.split('\n').map(tel => <a href={`tel: ${tel.split(': ')[1]}`}>{tel}</a>)
                    }
                  </td>
                </tr>
                <tr className="adress">
                  <th>
                    {language === 'en' ? 'Address' : 'Адреса'}
                  </th>
                  <td>
                    {
                      contactPage.address
                    }
                  </td>
                </tr>
                <tr className='social'>
                  <th>
                    {language === 'en' ? 'Social' : 'Соціальні мережі'}
                  </th>
                  <td>
                    <a href={contactPage.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={contactPage.behance} target="_blank" rel="noopener noreferrer">Behance</a>
                    <a href={contactPage.pinterest} target="_blank" rel="noopener noreferrer">Pinterest</a>
                  </td>
                </tr>
              </table>
              <div className="qr-code">
                <span>{language === 'en' ? 'No stumps' : 'Не зволікай'}</span>
                <img src="img/contact/qr.svg" alt="qr-code" />
                <span>{language === 'en' ? 'Just QR us' : 'Просто QR нас'}</span>
              </div>
            </div>
          </div>
          <MainWaveAnimatione />
        </div>
        </section>
      </>
    )
  }
}

export default Contact
