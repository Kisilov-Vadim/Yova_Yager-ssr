import React, {useState, useEffect} from 'react';
import './SocialityPage.scss';
import LazyLoad from 'react-lazyload'; 
import Masonry from 'react-masonry-css'; 
import {getData, getToken} from '../../store/actions';
import $ from 'jquery';

import WorksPageNav from '../../components/WorksPageNav/WorksPageNav';
import {WorksCard} from '../../components/WorksCard/index';
import {ButtonDecorate} from '../../components/ButtonDecorate/index';
import Preloader from '../../components/Preloader/Preloader';


const SocialityPage = ({screenWidth, allSocialities, setAllSocialities, language, allText}) => {
  const [filter, setFilter] = useState("VIEW ALL")
  const [elementCount, setElementCount] = useState(4)

  useEffect(() => {
    setAllSocialities(false)
    language === 'en' ? setFilter('VIEW ALL') : setFilter('ПОКАЗАТИ ВСЕ');
    getToken('http://yova.praid.com.ua/api/login')
      .then(data => data.data['api_token'])
      .then(token =>  {
        Promise.all(
          [
            getData("http://yova.praid.com.ua/api/projects", token, 'soc', language, '', 'false'),
          ])
        .then(data => {
          setAllSocialities(data[0]); 
        })
        .catch(err => console.log(err)); 
      })
  }, [])

  useEffect(() => {
    if (!allSocialities) return
    let height = $('.sociality__gallery-text').height();
    $('.sociality__gallery-table > div:nth-child(2)').css('top', -height-110)
  })

  if (!allSocialities) {
    return (
      <Preloader />
    )
  } else {
  
    let categories = new Set(); 
    allSocialities.forEach(work => categories.add(work.category_name))
    categories.delete('');
    if (categories.size === 0) {
      categories = []
    } else {
      if (language === 'en') {
        categories = ['VIEW ALL', ...categories]
      } else {
        categories = ['ПОКАЗАТИ ВСЕ', ...categories]
      }
    }
  
    const filteredSociality = filter === 'VIEW ALL' || filter === 'ПОКАЗАТИ ВСЕ' ? allSocialities : allSocialities.filter(item => item.category_name === filter)

    return (  
      <section className="sociality">
        <div className="wrapper">
          <div className="sociality__nav">
            <h1 className="sociality__nav-title">{language === 'en' ? 'Sociality' : 'Соціальність'}</h1>
            <WorksPageNav setFilter={setFilter} filter={filter} categories={categories} />
          </div>
          {
              language === 'en' ?
                  <div className="sociality__gallery-text">
                    YOVA YAGER studio hospitality design and Kiev restaurant Alltrueeast take conscious steps to ensure the preservation of the environment. <br/><br/> Brands care about the environment, adhere to the principles of application of development and implement meaningful objects oriented to a person. In the life of a restaurant it is sorting garbage and using recyclable materials. Design studio - the use of environmental materials, products of local manufacturers and the offer of tools to solve problems facing public organizations. 
                  </div>
                :
                  <div className="sociality__gallery-text">
                    Студия YOVA YAGER hospitality design и киевский ресторан Alltrueeast делают осознанные шаги, направленные на сохранение окружающей среды. <br/><br/> Бренды заботятся об экологии, соблюдают принципы устойчивого развития и реализовывают осмысленные объекты, ориентированные на человека. В жизни ресторана это – сортировка мусора и использование перерабатываемых материалов. В жизни дизайн-студии – применение экологичных материалов, продукции локальных производителей и предложение инструментов для решения задач, стоящих перед современным обществом.
                  </div>
            }
          <Masonry 
            breakpointCols={`${screenWidth < 700 ? 1 : 2}`}
            className="sociality__gallery-table"
            columnClassName="sociality__gallery-columns"
          >
            {filteredSociality.map((item, index) => {
                return <WorksCard 
                    key={item.id}
                    image={item.projectImage} 
                    title={item.title}
                    link={item.alias}
                    location={item.city_country}
                    backgroundPici={index === 0 ? true : false}
                    area="socialities"
                  />   
              })
            }
          </Masonry>
        </div>
        {
          elementCount < filteredSociality.length ?
            <LazyLoad height={elementCount >= filteredSociality.length ? 0 : 85} unmountIfInvisible={true} offset={400}>
              <div 
                onClick={() => setElementCount(elementCount + 8)} 
              >
                <ButtonDecorate 
                  title={allText.button_more_en} 
                  title_ua={allText.button_more_ua}
                  id={'buttonSocialityPage'}
                  autoStart={true}
                />
              </div> 
            </LazyLoad>
            : null
        }
      </section>
    );
  }
}
 
export default SocialityPage;