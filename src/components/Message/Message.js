import React, {useEffect, useState} from 'react';
import Typist from 'react-typist';
import './Message.scss';
import $ from 'jquery';
import {useTrail, animated, config} from 'react-spring';

import {MainWaveAnimatione} from '../MainWaveAnimation/index';

const Message = ({language, allText}) => {
  const [showText, setShowText] = useState(false);

  const infoText = allText.main_message_en.split('\n');
  const infoTextUa = allText.main_message_ua.split('\n')

  const showAnimation = useTrail(infoText.length, {
    to: { transform: showText ? 'translate(0, 0)' : 'translate(0, 200%)', visibility: showText ? 'visible' : 'hidden'},
    config: { mass: 1, tension: 200, friction: 26 }
  })

  useEffect(() => {
    if (showText) {
      $('.message__info-title')
      .text(language === 'en'
        ?
          allText.main_phrase_en
        :
          allText.main_phrase_ua
      )
    }

    let rigthMargin = $('.message .wrapper').css('margin-right')
    $('.message__animation').css('right', `-${rigthMargin}`)
  });

  return (
    <section className="message">
     <div className="wrapper">
        <div className="message__info">
          <Typist
            startDelay={500}
            onTypingDone={() => setShowText(true)}
            avgTypingDelay={100}
            cursor={{show: false}}
          >
            <h1 className="message__info-title">{language === 'en' ? allText.main_phrase_en : allText.main_phrase_ua}</h1>
          </Typist>
          <div className="message__info-text">
            {showAnimation.map((item, index) => (
              showText &&
              language === 'en'
                  ? <animated.div key={index}>
                      <animated.p style={item} key={index}>
                        {infoText[index]}
                      </animated.p>
                    </animated.div>

                  :
                  <animated.div key={index}>
                    <animated.p style={item} key={index}>
                      {infoTextUa[index]}
                    </animated.p>
                  </animated.div>
            ))}
          </div>
        </div>
      <MainWaveAnimatione start={showText}/>
      <div className="message__social">
        <a href="https://www.instagram.com/yovayager/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.behance.net/yovayager" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://www.pinterest.com/yovayager/" target="_blank" rel="noopener noreferrer">Pinterest</a>
      </div>
    </div>
    </section>
   );
}

export default React.memo(Message);
