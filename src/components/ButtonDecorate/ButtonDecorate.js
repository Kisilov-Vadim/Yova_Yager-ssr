import React, {useEffect, useState, Suspense} from 'react';
import './ButtonDecorate.scss';
import PropTypes from 'prop-types';
import Warp from 'warpjs';

const ButtonDecorate = ({screenWidth, title, title_ua, language, id, autoStart}) => {
  const [animButton, setAnimButton] = useState(null)

  let animId, svg, warp, animate;
  let speed = 4;
  let offset = 0;

  useEffect(() => {
    window.addEventListener('scroll', getAnimateButton);

    if (screenWidth < 850) {
      return
    }

    svg = document.getElementById(id);
    warp = new Warp(svg);
    warp.interpolate(10);
    warp.transform(([ x, y ]) => [ x, y, y ]);
    animate = () => {
      warp.transform(([ x, y, oy ]) => [ x, oy + speed * Math.sin(x / 16 + offset), oy ])
      animId = requestAnimationFrame(animate);
      offset += 0.08;
    }
    if (autoStart) {
      animate();
    }

    return () => {
      window.removeEventListener('scroll', getAnimateButton);
      cancelAnimationFrame(animId);
      animId = null
    }
  }, [])

  const getAnimateButton = () => {
    svg = document.getElementById(id) || null;
    if (svg) {
      setAnimButton(svg)
    } else {
      setAnimButton(null)
    }
  }

  const startAnimate = () => {
    if (!animId) {
      speed = 0.2;
      animate();
      let timer = 50;

      for (let i = 0.4; i < 4; i += 0.2) {
        setTimeout(() => {
        cancelAnimationFrame(animId);
        animId = null
        speed = i
        animate()
      }, timer)
        timer += 50;
      }
    } else {
      return
    }
  }

  const stopAnimate = () => {
    setTimeout(() => {
      cancelAnimationFrame(animId);
      animId = null
      speed = 3.8
      animate()
      let timer = 50;

      for (let i = 3.6; i >= -0.8; i -= 0.2) {
        setTimeout(() => {
          cancelAnimationFrame(animId);
          animId = null
          if (i < 0) {
            return
          } else {
            speed = i
            animate()
          }
        }, timer)
        timer += 50;
      }
    }, 1000)
  }

  return (
      <div
        className="decorateButton"
        onMouseEnter={autoStart ? null : startAnimate}
        onMouseLeave={autoStart ? null : stopAnimate}
        data-test="decorateButton"
      >
        <button
          className="decorateButton-button"
          data-test="button"
        >
          {language === 'en' ? title : title_ua}
        </button>
        <svg
          id={id}
          data-test={`${autoStart === true ? 'svg-autostart' : 'svg-hoverstart'}`}
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path fill="none" stroke="#201600" strokeMiterlimit="50"
              d='M21.846 49.814C14.717 45.661-5.908 24.69 3.346 8.793 12.6-7.104 46.543 6.36 59.743 5.653c24.678-1.326 40.03-6.292 52.881-2.209 18.068 5.741 44.949 40.629 23.356 58.735-7.17 6.013-42.746 31.797-67.423 10.6C54.29 60.524 40.795 60.854 21.846 49.813z'>
            </path>
          </g>
        </svg>
      </div>
  );
}

ButtonDecorate.propTypes = {
  title: PropTypes.string.isRequired,
  title_ua: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  autoStart: PropTypes.bool,
  startAnimate: PropTypes.func,
  stopAnimate: PropTypes.func,
};

ButtonDecorate.defaultProps = {
  autoStart: false
}

export default ButtonDecorate;
