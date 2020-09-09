import React from 'react'
import PropTypes from 'prop-types';

import Image from '../Image/Image'; 

export default function DoublePhoto({images}) {
  return (
    <>
      <Image imageClass="workGallery__short-left" src={images[0]} alt="photo" />
      <Image imageClass="workGallery__short-right" src={images[1]} alt="photo" />
    </>
  )
}

DoublePhoto.propTypes = {
  images: PropTypes.arrayOf(PropTypes.sting).isRequired
}