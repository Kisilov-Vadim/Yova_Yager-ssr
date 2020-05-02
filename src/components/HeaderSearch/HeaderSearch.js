import React, {useEffect, useState} from 'react';


const textInput = React.createRef();

const HeaderSearch = () => {
  const [formActive, setFormActive] = useState(false); 

  const searchClick = () => {
    setFormActive(!formActive);
  } 

  useEffect(() => {
    textInput.current.focus(); 
  })

  return ( 
    <div className="header__info-search">
      <button 
        onClick={searchClick} 
        className={formActive === true ? 'invisible' : 'visible'}
      >
        <img src="/img/header/search.svg" alt="Search"/>
      </button>
      <form className={`header__info-form ${formActive === false ? "invisible" : "visible"}`}>
        <input 
          placeholder="Search..."  
          onBlur={() => setFormActive(!formActive)}
          ref={textInput}
        />
        <button className={`${formActive === true ? 'is-active-button' : null}`}>
          <img src="/img/header/search.svg" alt="Search"/>
        </button>
      </form>
    </div>
  );
}
 
export default HeaderSearch;