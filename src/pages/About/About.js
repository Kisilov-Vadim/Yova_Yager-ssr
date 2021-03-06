import React, {useState, useEffect} from 'react';
import './About.scss';
import LazyLoad from 'react-lazyload';
import Awards_card from './Awards_card';
import $ from 'jquery';
import {getData, getToken, setSeo} from '../../store/actions';
import {MetaTags} from 'react-meta-tags';

//import Components
import {ButtonDecorate} from '../../components/ButtonDecorate/index';
import LazyPhotoLoad from '../../components/LazyPhotoLoad/LazyPhotoLoad';
import Preloader from '../../components/Preloader/Preloader';


const About = ({language, setAboutPage, aboutPage, allText}) => {
  const [openAwards, setOpenAwards] = useState(true);
  const [awardsCardsHeight, setAwardsCardsHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  

  useEffect(() => {
    if (window.__INITIAL_STORE__) {
      delete window.__INITIAL_STORE__
    }
    setWindowWidth($(window).width())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize);

    if (windowWidth > 560) {
      $('.awards__cards').css('height', 'auto')
      return
    };

    if (!$('.awards__cards').innerHeight() || awardsCardsHeight) return
    setAwardsCardsHeight($('.awards__cards').innerHeight());
    setOpenAwards(false);

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [windowWidth])

  const resize = () => {
    setWindowWidth($(window).width())
  }

  const closeAwards = () => {
    let height = $('.awards__cards-card'); 
    let allHeight = 0;
    if (height.length <= 3) {
      return 'auto'; 
    } else {
      for (let i = 0; i < 3; i++) {
        allHeight += $(height[i]).innerHeight();
      }
      allHeight += Number($(height[0]).css('margin-top').replace('px', '')) * 6;  
    }
    return `${allHeight}px`;  
  }

  if (!aboutPage) {
    return (
      <Preloader />
    )
  } else {
    
    return (
      <>
        <MetaTags>
          <title>{aboutPage[0].meta_title}</title>
					<meta name="description" content={aboutPage[0].meta_description} />
					<meta property="og:image" content={aboutPage[0].meta_image} />
        </MetaTags>
        <section className="about" itemScope itemType="http://schema.org/Person">
          <meta itemProp="jobTitle" content="designer" />
          <div className="wrapper">
            <h1 className="about__title">{language === 'en' ? "About" : "Про мене"}</h1>
            <div className="about__content">
              <div className="about__content-yova">
                <LazyPhotoLoad
                  actualClass="content_photo"
                  image={aboutPage[0].image_left}
                  alt="Yova Yager"
                  itemProp="image"
                />
                <div className="content_text">
                  {
                    aboutPage[0].text_right.split('\n').map(text => {
                      if (text.includes('##')) {
                        return (
                          <p key={text} className="quote" itemProp="name">
                            {text.replace('## ', '')}
                          </p>
                        )} else if (text.includes('#')) {
                        return (
                          <p key={text} className="title">
                            {text.replace('# ', '')}
                          </p>
                        )
                      } else if (text === '') {
                        return null
                      } else {
                        return (
                          <p className="text" key={text} itemProp="description">
                            {text}
                          </p>
                        )
                      }
                    })
                  }
                </div>
              </div>
              <div className="about__content-studio">
                <div className="content_text content_text-left">
                  {
                    aboutPage[0].text_left.split('\n').map(text => {
                      if (text.includes('##')) {
                        return (
                          <p key={text} className="quote">
                            {text.replace('## ', '')}
                          </p>
                        )
                      } else if (text.includes('#')) {
                        return (
                          <p key={text} className="title">
                            {text.replace('# ', '')}
                          </p>
                        )
                      } else if (text === '') {
                        return null
                      } else {
                        return (
                          <p className="text" key={text} itemProp="description">
                            {text}
                          </p>
                        )
                      }
                    })
                  }
                </div>
                <LazyPhotoLoad
                  actualClass="content_photo"
                  image={aboutPage[0].image_right}
                  alt="Yova Yager studio"
                  itemProp="image"
                />
              </div>
            </div>
            <LazyLoad
              height={80}
              offset={100}
            >
              <div className="about__press-button">
                <a href="#" target="_blank">
                  <ButtonDecorate
                    title={allText.button_link_en}
                    title_ua={allText.button_link_ua}
                    id="aboutPressKitButton"
                    autoStart={true}
                  />
                </a>
              </div>
            </LazyLoad>
            <div className="awards">
              <h1 className="about__title">{language === 'en' ? 'AWARDS' : 'Нагороди'}</h1>
              <div className="awards__cards"
                  style={{
                    height: `${windowWidth < 560 ? openAwards === true ? `${awardsCardsHeight}px` :  `${closeAwards()}` : 'auto'}`  
                  }}
              >
                {
                  aboutPage[1].map(({title, text, image, id}) =>
                    <Awards_card
                      title_first={title}
                      title_second={text}
                      img={image}
                      key={id}
                    />)
                }
              </div>
              {
                aboutPage[1].length <= 3 
                  ?
                    null 
                  :
                    <button
                      className="awards__more"
                      onClick={() => setOpenAwards(!openAwards)}
                    >
                      {language === 'en' ? openAwards ? 'less awards' : 'more awards' : openAwards ? 'менше нагород' : 'більше нагород'} {openAwards === true ? '-' : '+'}
                    </button>                       
              }
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default About;
