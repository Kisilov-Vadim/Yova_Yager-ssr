import React, {useState, useEffect} from 'react';
import './About.scss';
import LazyLoad from 'react-lazyload';
import Awards_card from './Awards_card';
import $ from 'jquery';
import {getData, getToken} from '../../store/actions';
import {MetaTags} from 'react-meta-tags';

//import Components
import {ButtonDecorate} from '../../components/ButtonDecorate/index';
import LazyPhotoLoad from '../../components/LazyPhotoLoad/LazyPhotoLoad';
import Preloader from '../../components/Preloader/Preloader';


const About = ({language, setAboutPage, aboutPage}) => {
  const [openAwards, setOpenAwards] = useState(true);
  const [awardsCardsHeight, setAwardsCardsHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  if (typeof window === undefined) {
    setWindowWidth($(window).width());
  }

  useEffect(() => {
    getToken('http://yova.praid.com.ua/api/login')
      .then(data => data.data['api_token'])
      .then(token => getData("http://yova.praid.com.ua/api/about", token, '', language, '', '')
        .then(data => setAboutPage(data))
      )
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize);

    if (windowWidth > 560) {
      $('.awards__cards').css('height', 'auto')
      return
    };

    if (!$('.awards__cards').innerHeight() || awardsCardsHeight) return
    setAwardsCardsHeight($('.awards__cards').innerHeight())
    setOpenAwards(false)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [windowWidth, aboutPage])

  const resize = () => {
    setWindowWidth($(window).width())
  }

  if (!aboutPage) {
    return (
      <Preloader />
    )
  } else {

    return (
      <>
        <MetaTags>
          <meta name="description" content="In About page you can read some information about YY" />
          <title>About Page</title>
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
                <a href="#" >
                  <ButtonDecorate
                    title="MEDIA KIT"
                    title_ua="Медіа комплект"
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
                    height: `${openAwards === true ? awardsCardsHeight : '680'}px`
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
              <button
                className="awards__more"
                onClick={() => setOpenAwards(!openAwards)}
              >
                {language === 'en' ? openAwards ? 'less awards' : 'more awards' : openAwards ? 'менше нагород' : 'більше нагород'} {openAwards === true ? '-' : '+'}
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default About;
