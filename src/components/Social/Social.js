import React from 'react';
import "./Social.scss"; 
import PropTypes from 'prop-types'

const Social = ({place}) => {
  return ( 
    <div className={`social ${place === 'footer' ? 'social__footer' : null}`}>
      <a href="https://www.instagram.com/yovayager/" target="_blank" rel="noopener noreferrer">
        <span>Inst</span>
      </a>
      <a href="https://www.behance.net/yovayager" target="_blank" rel="noopener noreferrer">
        <span>Be</span>
      </a>
      <a href="https://www.pinterest.com/yovayager/" target="_blank" rel="noopener noreferrer">
        <span>Pnt</span>
      </a> 
    </div>
  );
}

Social.propTypes = {
  place: PropTypes.string, 
}
 
export default React.memo(Social);