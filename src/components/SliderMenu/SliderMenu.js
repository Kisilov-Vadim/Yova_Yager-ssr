import React, {useEffect} from 'react';
import './SliderMenu.scss'; 

import {Navigation} from '../Navigation/index'; 
import Social from '../Social/Social'; 

const SliderMenu = ({menuShow, scrollPosition, unShowMenu}) => {

  useEffect(() => {
    document.addEventListener('click', unShowMenu)

    return () => {
      document.removeEventListener('click', unShowMenu);
    }
  }, [])

  return ( 
    <div className={`
      menu 
      ${menuShow === true ?  "menu__visible" : null}
      ${scrollPosition > 0 ? "menu-scroll" : null}  
    `}>
      {/* <form className="menu__form">
        <input 
          placeholder='Search...'  
        />
        <button>
          <img src="/img/header/search.svg" alt="search" />
        </button>
      </form> */}
      <Navigation />
      <div className="menu__social">
        <Social place='menu' />
      </div>
    </div>
  );
}
 
export default React.memo(SliderMenu);