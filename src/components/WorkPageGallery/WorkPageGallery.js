import React from 'react';
import './WorkPageGallery.scss'; 
import PropTypes from 'prop-types';

import Image from '../Image/Image';
import TextAndPhoto from './TextAndPhoto'; 
import DoublePhoto from './DoublePhoto';

const WorkPageGallery = ({images}) => {
  return (  
    <div className="workGallery">
      {
        images.map((image, index) => {
          if (image.type === 'single-image') {
            return <Image imageClass="workGallery__large" src={image.imageURL[0]} alt="photo" />
          } else if (image.type === 'left-side') {
            return (
              <TextAndPhoto 
                image={image.imageURL[0]} 
                imagePosition={image.type} 
                text={image.description}
              />
            )
          } else if (image.type === 'right-side') {
            return (
              <TextAndPhoto 
                image={image.imageURL[0]} 
                imagePosition={image.type} 
                text={image.description} 
              />
            )
          } else if (image.type === 'double-image') {
            return <DoublePhoto images={image.imageURL} /> 
          }
        })
      }
    </div>
  );
}
 
WorkPageGallery.prototype = { 
  images: PropTypes.array.isRequired, 
}

export default WorkPageGallery;