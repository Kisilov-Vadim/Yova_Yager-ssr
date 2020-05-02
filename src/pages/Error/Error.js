import React, {useEffect} from 'react'
import './Error.scss'; 

import $ from 'jquery';

export default function Error() {

  useEffect(() => {
    $('#header').css('display', 'none');
    $('#footer').css('display', 'none');
  })

  return (
    <div className="error">
      <div className="error__container">
        <img src="/img/error/top.png" />
        <a href="http://yova.praid.com.ua" className="error__link">Back to home</a>
        <img src="/img/error/bottom.png" />
      </div>
    </div>
  )
}
