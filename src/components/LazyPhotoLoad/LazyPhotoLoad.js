import React, {useState} from 'react'
import PropTypes from 'prop-types';

import ImagesLoaded from 'react-images-loaded';
import {useSpring, animated} from 'react-spring';
 

export default function LazyPhotoLoad({actualClass, image, alt}) {
  const [photo, setPhoto] = useState(false); 
  
  const showMainPhoto = useSpring({ opacity: photo ? 1 : 0 })

  return (
    <ImagesLoaded
      elementType={'div'}
      className={actualClass}
      done={() => setPhoto(true)}
    >
      <animated.img src={image} alt={alt || "Altruist"} style={showMainPhoto} />
    </ImagesLoaded> 
  )
}

LazyPhotoLoad.propTypes = {
  actualClass: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired, 
  alt: PropTypes.string.isRequired
};
