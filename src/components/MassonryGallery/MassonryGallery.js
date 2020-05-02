import React, {useState, useEffect} from 'react';
import './MassonryGallery.scss';
import Masonry from 'react-masonry-css';
import {WorksCard} from '../WorksCard/index';
import {ButtonDecorate} from '../ButtonDecorate/index';
import PropTypes from 'prop-types'
import $ from 'jquery'
import LazyLoad from 'react-lazyload'; 

const MassonryGallery = (
    {
      screenWidth, allText, title, title_ua, language, backgroundPici, 
      button, worksArr, area, photoLoadButton, 
      count, buttonAutoStart
    }
  ) => {
  const [elementCount, setElementCount] = useState(4);

  useEffect(() => {
    if (!photoLoadButton) {
      window.addEventListener('scroll', onScrollList);
    }
    
    return () => {
      
      if (!photoLoadButton) {
        window.removeEventListener('scroll', onScrollList);
      }
    }
  })

  const onScrollList = () => {
    let gallery = $('.massonry .massonry__gallery'); 
    const scrollBottom = gallery.scrollTop() + gallery.outerHeight() - ($(window).scrollTop() + $(window).innerHeight() / 2); 

    if (scrollBottom < 0) {
      setElementCount(elementCount + count)
    }
  }

  return (  
    <div className="massonry">
      {title === false ? null : 
        <h2 itemProp="name" className="massonry__title">
          {
            language === 'en' ? title : title_ua
          }
        </h2>
      }
      <div className="massonry__gallery">
        <Masonry 
          breakpointCols={`${screenWidth < 700 ? 1 : 2}`}
          className="massonry__gallery-table"
          columnClassName="massonry__gallery-columns"> 

          {worksArr.map((work, index) => {
            if (elementCount <= index) {
              return
            }
            return <WorksCard 
              key={work.id}
              image={work.projectImage} 
              title={work.title}
              link={work.alias}
              location={work.city_country}
              backgroundPici={backgroundPici === true ? index === 0 ? true : false : false}
              area={area}
            />
          })}
        </Masonry>   
      </div>
      {
        photoLoadButton && button && elementCount < worksArr.length ?
          <LazyLoad height={elementCount >= worksArr.length ? 0 : 85} unmountIfInvisible={true} offset={200}>
            <div 
              onClick={() => setElementCount(elementCount + count)} 
            >
              <ButtonDecorate 
                title={allText.button_more_en} 
                title_ua={allText.button_more_ua}
                id={'buttonMassonry'}
                autoStart={buttonAutoStart}
              />
            </div> 
          </LazyLoad>
          : null
      }
    </div>
  );
}
 
MassonryGallery.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string, 
  title_ua: PropTypes.string, 
  button: PropTypes.bool.isRequired, 
  photoLoadButton: PropTypes.bool,
  buttonAutoStart: PropTypes.bool.isRequired
}

MassonryGallery.defaultProps = {
  photoLoadButton: true
}

export default MassonryGallery;