import React, {useEffect, useState} from 'react';
import './Featured.scss';
import {WorksCard} from '../WorksCard/index';
import $ from 'jquery';
import PropTypes from 'prop-types';

const Featured = ({screenWidth, featured, language, allText}) => {
  const [cardsHeight, setCardsHeight] = useState()

  useEffect(() => {
    setCardsHeight($($('.card')[0]).width())
  }, [screenWidth])

  return (
    <section className="featured" data-test="featured-main">
      {
        language === 'en'
          ?
            <h3 data-test="title-en">{allText['main_subtitle-first_en']}</h3>
          :
            <h3 data-test="title-ua">{allText['main_subtitle-first_ua']}</h3>
      }

      <div className='featured__projects' style={{ gridAutoRows: `${cardsHeight}px` }} data-test="featured-projects">
        {(featured || []).map((item, i) => {
            return <WorksCard
              key={item.id}
              image={item.projectImage}
              title={item.title}
              link={item.alias}
              location={item.city_country}
              area={item.type}
            />
        })}
      </div>
    </section>
  );
}

Featured.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  featured: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  allText: PropTypes.object.isRequired
}

export default Featured;
