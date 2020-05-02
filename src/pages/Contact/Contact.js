import React, {useEffect} from 'react'
import './Contact.scss'
import {MainWaveAnimatione} from '../../components/MainWaveAnimation/index';
import {getData, getToken} from '../../store/actions';

import Preloader from '../../components/Preloader/Preloader'; 

const Contact = ({language, setContactPage, contactPage}) => {

  useEffect(() => {
    getToken('http://yova.praid.com.ua/api/login')
      .then(data => data.data['api_token'])
      .then(token => getData("http://yova.praid.com.ua/api/contact", token, '', language, '', '')
        .then(data => setContactPage(data))
      )
  }, [])

  if (!contactPage) {
    return (
      <Preloader />
    )
  } else {
    return (
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
    )
  }
}

export default Contact