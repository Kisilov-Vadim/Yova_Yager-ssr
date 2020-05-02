import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import './WorksCard.scss';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Warp from 'warpjs';

const WorksCard = ({
  screenWidth,
  image,
  backgroundPici,
  title,
  link,
  location,
  area,
  language
}) => {

  let animIdPici,
    mainTimer,
    svgPici,
    warpPici,
    animatePici,
    timeoutPici;
  let offsetPici = 0;
  let animSpeed = 0;

  useEffect(() => {
    if (!backgroundPici || screenWidth < 850) {
      return
    }

    svgPici = document.getElementById('backgroundPici');
    warpPici = new Warp(svgPici)
    warpPici.interpolate(10)
    warpPici.transform(([x, y]) => [x, y, y])
    animatePici = () => {
      timeoutPici = setTimeout(() => {
        warpPici.transform(([x, y, oy]) => [
          x, oy + animSpeed * 8 * Math.sin(oy / 32 + offsetPici),
          oy
        ])
        animIdPici = requestAnimationFrame(animatePici)
        offsetPici -= 0.27;
      }, 1000 / 60);
    }

    return() => {
      clearTimeout(timeoutPici)
      cancelAnimationFrame(animIdPici);
      animIdPici = null;
    }
  })

  const startAnimate = () => {
    let timer = 50;
    clearTimeout(mainTimer)

    for (let i = animSpeed; i <= 1.2; i += 0.1) {
      mainTimer = setTimeout(() => {
        clearTimeout(timeoutPici)
        cancelAnimationFrame(animIdPici);
        animIdPici = null
        animSpeed = i
        animatePici()
      }, timer)
      timer += 50;
    }
  }

  const stopAnimate = () => {
    clearTimeout(mainTimer)

    mainTimer = setTimeout(() => {
      clearTimeout(timeoutPici)
      cancelAnimationFrame(animIdPici);
      animIdPici = null
      let timer = 50;

      for (let i = animSpeed; i >= -0.8; i -= 0.1) {
        if (i < 0) {
          mainTimer = setTimeout(() => {
            clearTimeout(timeoutPici)
            cancelAnimationFrame(animIdPici);
            animIdPici = null;
          }, timer)
          return
        }
        mainTimer = setTimeout(() => {
          clearTimeout(timeoutPici)
          cancelAnimationFrame(animIdPici);
          animIdPici = null;
          animSpeed = i
          animatePici()
        }, timer)
        timer += 50;
      }
    }, 1100)
  }

  if (screenWidth > 850 && typeof window !== undefined) {

    return (
      <Fade bottom="bottom" duration={1700} delay={100} data-test="screenWidth-more-850">
      <div data-test="withBackgroundPici" className="card" onMouseOver={backgroundPici
          ? startAnimate
          : null} onMouseLeave={backgroundPici
          ? stopAnimate
          : null} itemScope="itemScope" itemType="http://schema.org/Place">
        <img itemProp="image" src={`http://yova.praid.com.ua${image}`} alt={title}/>
      <Link to={`/${area}/${link}`} exact={true} className="card__info" onClick={() => window.scrollTo(0, 0)} data-test={`/${area}/${link}`} itemProp="url">
          <div data-test="hover-content">
            <span itemProp="name" data-test={`${title}`}>{title}</span>
            <p itemProp="address" data-test={`${location}`}>{location}</p>
          </div>
        </Link>
        {
          backgroundPici === true
            ? <div className="card__pici" data-test="background-pici">
                <svg xmlns="http://www.w3.org/2000/svg" id="backgroundPici" width="655px" height="666px" viewBox="30 0 600 620">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.483212426">
                    <g>
                      <path d="M181.737471,77.4276554 C173.763118,84.3330971 165.524568,91.4804491 157.409311,98.0955983 C141.729206,110.877263 123.358694,122.502156 105.591431,133.735594 C66.076335,158.762322 25.2006232,184.629139 13.6067689,224.029742 C4.91468067,253.569198 -2.50485767,304.036101 2.75707012,357.080449 C6.78607758,397.690604 19.8110001,454.319624 59.031076,493.504706 C95.9922658,530.424628 128.039387,537.541192 168.606869,546.540258 C205.585672,554.752015 247.48735,564.058967 305.452218,597.904428 C382.800355,643.088888 454.450638,666 518.421589,666 C544.449418,666 569.873996,662.2218 593.964379,654.766562 C654,636.187845 653.562866,538.992654 653.223813,460.890789 C653.148957,443.763535 653.074101,427.586328 653.633319,413.190461 C656.755249,331.846998 639.388686,282.844752 622.585743,235.443513 C609.116089,197.445991 575.338475,171.931044 536.237288,142.378392 C524.581788,133.581651 512.534395,124.477024 500.539842,114.642268 C485.401341,102.252058 472.037366,87.3723711 459.113719,72.994098 C426.652688,36.8614845 396.001409,2.73452787 338.291931,2 C337.547776,2 336.799217,2 336.059465,2 C268.772838,2 224.533015,40.3449939 181.737471,77.4276554 Z" stroke="#979797"></path>
                      <path d="M211.298877,103.173518 C204.101379,109.408713 196.657211,115.863921 189.318759,121.8395 C175.152815,133.399032 158.550999,143.902497 142.499787,154.075941 C106.794208,176.671373 69.8596817,200.050053 59.3982028,235.639507 C51.5399803,262.322797 44.8358241,307.922885 49.5842343,355.863921 C53.2182217,392.553445 64.9967458,443.715485 100.438034,479.120128 C133.82667,512.47424 162.775234,518.907447 199.423446,527.039162 C232.847321,534.462433 270.720077,542.875765 323.111164,573.475303 C393.002652,614.30989 457.736082,635 515.531898,635 C539.044898,635 562.020508,631.585384 583.789194,624.852957 C637.986262,608.061494 637.598637,520.236332 637.294703,449.660262 C637.228631,434.193282 637.158154,419.571156 637.669114,406.568333 C640.488208,333.035276 624.793787,288.772872 609.614731,245.958161 C597.439772,211.622786 566.923088,188.569726 531.587516,161.864435 C521.064369,153.913131 510.180026,145.68901 499.339731,136.804848 C485.662724,125.606138 473.593481,112.163287 461.907459,99.1560632 C432.584484,66.5147959 404.878083,35.6776429 352.742477,35.0132008 C352.072942,35.0088006 351.407812,35 350.738278,35 C289.960389,35 249.968908,69.6565949 211.298877,103.173518 Z" stroke="#979797"></path>
                      <path d="M232.825162,129.680147 C226.297264,135.33823 219.55353,141.176703 212.911108,146.5884 C200.079955,157.059814 185.046408,166.572081 170.506197,175.776366 C138.197064,196.235221 104.782329,217.376037 95.3164359,249.577834 C88.2071053,273.732482 82.137305,314.993372 86.431975,358.374943 C89.7179482,391.575485 100.373135,437.878492 132.444409,469.917499 C162.656861,500.095409 188.856551,505.903084 222.029022,513.272671 C252.285523,519.995495 286.585621,527.607069 334.016397,555.316717 C397.282392,592.265849 455.879309,611 508.194997,611 C529.474536,611 550.265144,607.915773 569.972173,601.813314 C619,586.642964 618.6451,507.161413 618.367598,443.303389 C618.305931,429.290173 618.248669,416.051314 618.697957,404.286373 C621.261545,337.753298 607.051693,297.667142 593.308749,258.918511 C582.296775,227.86945 554.683148,206.997018 522.713184,182.842371 C513.181219,175.639974 503.3233,168.182391 493.500619,160.130842 C481.109945,149.99381 470.172852,137.810892 459.596952,126.041551 C433.062499,96.5060041 407.986031,68.6159655 360.823947,68.0131993 C360.220491,68 359.617035,68 359.009174,68 C304.010969,68 267.816812,99.3570445 232.825162,129.680147 Z" stroke="#979797"></path>
                      <path d="M256.114762,155.402503 C250.376392,160.390207 244.43575,165.553998 238.591847,170.3392 C227.290996,179.570633 214.059766,187.965646 201.259464,196.078918 C172.822653,214.119172 143.40966,232.78454 135.076932,261.169986 C128.824087,282.476679 123.47707,318.874146 127.263075,357.151357 C130.160841,386.434854 139.535711,427.27415 167.752661,455.531932 C194.347037,482.143288 217.401652,487.276264 246.599182,493.769523 C273.23753,499.690494 303.437625,506.408266 345.202405,530.871343 C400.888777,563.469704 452.472545,580 498.520215,580 C517.24357,580 535.527204,577.27063 552.869833,571.899935 C595.988955,558.52162 595.676753,488.420838 595.430509,432.103374 C595.373345,419.728763 595.329373,408.049702 595.725122,397.660488 C597.976498,339.009852 586.029256,305.205286 573.382856,269.410922 C563.691387,242.024777 539.37477,223.610336 511.214984,202.290436 C502.825092,195.938047 494.158174,189.378755 485.522038,182.286796 C474.616936,173.341507 464.987028,162.591311 455.67372,152.206499 C432.320093,126.141018 410.259249,101.532667 368.767098,101.008804 C368.230637,101 367.689779,101 367.153318,101 C318.766328,101 286.912879,128.659082 256.114762,155.402503 Z" stroke="#979797"></path>
                      <path d="M275.241683,189.436351 C237.100431,220.47119 196.829443,256.571505 187.305154,288.885904 C177.009221,323.755027 174.244531,374.809931 219.546637,419.985892 C242.193281,442.556284 261.069893,447.12049 284.982032,452.915887 C306.711522,458.174837 331.342393,464.128531 366.38384,484.561925 C389.559611,498.078657 407.982056,511.129295 424.239489,522.627751 C452.437558,542.581859 472.808955,557 495.415914,557 C501.156944,557 506.858289,556.098591 512.846245,554.247406 C557.751506,540.378905 565.344481,476.396482 567.152332,429.479264 C569.665686,364.314017 566.601158,320.602296 557.808828,295.833346 C550.850805,276.22661 529.641624,263.250723 507.184584,249.514135 C495.288042,242.232512 482.990244,234.713446 472.103452,225.813685 C461.229888,216.927115 453.341484,205.692486 445.708824,194.836008 C431.113733,174.059639 417.316741,154.439712 384.854789,154.026383 C383.509924,154.008794 382.178287,154 380.864288,154 C335.593048,154 306.971676,163.603299 275.241683,189.436351 Z" stroke="#979797"></path>
                      <path d="M307.282875,223.961108 C277.218608,248.446278 245.466276,276.929655 237.962298,302.433029 C229.856068,329.94209 227.684443,370.21381 263.362406,405.833391 C281.196991,423.634404 296.073066,427.237617 314.914336,431.806368 C332.058749,435.962571 351.49348,440.667375 379.153133,456.813807 C397.436111,467.49617 411.973694,477.792318 424.801231,486.868377 C447.023028,502.624205 463.077232,514 480.87665,514 C485.391345,514 489.875268,513.29779 494.587784,511.827539 C529.936047,500.895014 535.910215,450.432477 537.330124,413.408477 C539.312722,361.976013 536.903712,327.47119 529.980007,307.92343 C524.502586,292.483597 507.784586,282.248892 490.095068,271.421698 C480.705205,265.66358 471.003226,259.729909 462.40904,252.699035 C453.819249,245.659384 447.590112,236.785211 441.563192,228.213865 C430.063247,211.82166 419.191931,196.346716 393.659944,196.017555 C392.596111,196.008778 391.558654,196 390.525593,196 C354.847631,196 332.296134,203.583864 307.282875,223.961108 Z" stroke="#B2B2B2"></path>
                    </g>
                  </g>
                </svg>
              </div>
            : null
        }
      </div>
    </Fade>);
  } else {

    return (
      <div className="card" data-test="screenWidth-less-850" itemScope="itemScope" itemType="http://schema.org/Place">
        <img src={`http://yova.praid.com.ua${image}`} alt={title} itemProp="image" />
      <Link to={`/${area}/${link}`} exact={true} className="card__info" onClick={() => window.scrollTo(0, 0)} data-test={`/${area}/${link}`} itemProp="url">
          <div data-test="hover-content">
            <span itemProp="name" data-test={`${title}`}>{title}</span>
            <p itemProp="address" data-test={`${location}`}>{location}</p>
          </div>
        </Link>
      </div>
    )
  }
}

WorksCard.protoTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  backgroundPici: PropTypes.bool,
  area: PropTypes.string.isRequired
}

WorksCard.defaultProps = {
  backgroundPici: false
}

export default WorksCard;
