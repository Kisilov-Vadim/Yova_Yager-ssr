import React from 'react'

export default function SelectLanguage({language, changeLanguage, getAllData, setIsLoaded}) {

  const handleChangeLanguage = (lang) => {
    if (lang === language) return
    setIsLoaded(false)
    changeLanguage(lang)
    getAllData(lang)
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

