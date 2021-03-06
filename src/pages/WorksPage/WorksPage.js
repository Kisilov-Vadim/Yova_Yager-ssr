import React, {useState, useEffect} from 'react';
import './Workspage.scss';
import {MetaTags} from 'react-meta-tags';

//import Components
import {WorksPageNav} from '../../components/WorksPageNav/index';
import {MassonryGallery} from '../../components/MassonryGallery/index';
import Preloader from '../../components/Preloader/Preloader';

//import Redux actions
import {getData, getToken} from '../../store/actions';

const WorksPage = ({works, language, setAllWorks, seoMeta}) => {
  const [filter, setFilter] = useState('VIEW ALL')

  useEffect(() => {
    language === 'en' ? setFilter('VIEW ALL') : setFilter('ПОКАЗАТИ ВСЕ');
    if (window.__INITIAL_STORE__) {
      delete window.__INITIAL_STORE__
    } else {
      setAllWorks(false)
      getToken('http://yova.praid.com.ua/api/login')
        .then(data => data.data['api_token'])
        .then(token =>  {
          Promise.all(
            [
              getData("http://yova.praid.com.ua/api/projects", token, 'work', language, '', 'false')
            ])
          .then(data => {
            setAllWorks(data[0])
          })
          .catch(err => console.log(err));
        })
    }
  }, [])

  if(!works) {
    return (
      <Preloader />
    )
  } else {
    let categories = new Set();
    works.forEach(work => categories.add(work.category_name))

    if (categories.size <= 1 && categories.has('')) {
      categories = []
    } else {
      categories.delete('');
      if (language === 'en') {
        categories = ['VIEW ALL', ...categories]
      } else {
        categories = ['ПОКАЗАТИ ВСЕ', ...categories]
      }
    }

    const filteredArr = filter === 'VIEW ALL' || filter === 'ПОКАЗАТИ ВСЕ' ? works : works.filter(item => item.category_name === filter)

    return (
      <>
        <MetaTags>
          <title>{seoMeta.work_meta_title}</title>
          <meta name="description" content={seoMeta.work_meta_description} />
          <meta property="og:image" content={seoMeta.work_meta_image} />
        </MetaTags>
        <section className="workspage">
          <div className="wrapper">
            <div className="workspage__nav">
              <h1 className="workspage__nav-title">{language === 'en' ? 'Works' : 'Роботи'}</h1>
              <WorksPageNav setFilter={setFilter} filter={filter} categories={categories} />
            </div>
            <MassonryGallery
              worksArr={filteredArr}
              title={false}
              button={true}
              photoLoadButton={false}
              area='works'
              count={8}
              buttonAutoStart={true}
            />
          </div>
        </section>
      </>
    );
  }
}

export default WorksPage;
