import React from 'react'
import Image from '../Image/Image';
import PropTypes from 'prop-types';

export default function TextAndPhoto({image, text, imagePosition, doublePhoto}) {

  return (
    <>
      {
        imagePosition === 'left-side'
          ?
            <>
              <Image imageClass="workGallery__short-left" src={image} alt="photo" />
              <div
                className="workGallery__short-right"
                style={{alignSelf: 'flex-start'}}
                itemProp="description"
              >
                {text}
              </div>
            </>
          :
            <>
              <div
                className="workGallery__short-left"
                style={{alignSelf: 'flex-start'}}
                itemProp="description"
              >
                {text}
              </div>
              <Image imageClass="workGallery__short-right" src={image} alt="photo" />
            </>
      }
    </>
  )
}

TextAndPhoto.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imagePosition: PropTypes.string.isRequired,
  doublePhoto: PropTypes.bool.isRequired
}
