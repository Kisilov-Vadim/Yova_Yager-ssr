import React from 'react'

export default function SelectLanguage({language, changeLanguage, getAllData, setIsLoaded}) {

  const handleChangeLanguage = (lang) => {
    if (lang === language) return
    // setIsLoaded(false)
    // changeLanguage(lang)
    // getAllData(lang)
    if(window.location.href.includes('com.ua/ua')) {
      window.location.href = window.location.href.replace('com.ua/ua', 'com.ua')
    } else {
      window.location.href = window.location.href.replace('com.ua', 'com.ua/ua')
    }
  }

  return (
    <div className="header__info-language">
      <span 
        className={language === 'en' ? "active" : null}
        onClick = {() => handleChangeLanguage('en')}
      >
        EN
      </span>
      <span
        className={language === 'ua' ? "active" : null}
        onClick = {() => handleChangeLanguage('ua')}
      >
        UA
      </span>
    </div>
  )
}

