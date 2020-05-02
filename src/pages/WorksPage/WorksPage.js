import React, {useState, useEffect} from 'react';
import './Workspage.scss';
import {getData, getToken} from '../../store/actions';

import {WorksPageNav} from '../../components/WorksPageNav/index';
import {MassonryGallery} from '../../components/MassonryGallery/index';
import Preloader from '../../components/Preloader/Preloader';

const WorksPage = ({works, language, setAllWorks}) => {
  const [filter, setFilter] = useState('VIEW ALL')

  useEffect(() => {
    setAllWorks(false)
    language === 'en' ? setFilter('VIEW ALL') : setFilter('ПОКАЗАТИ ВСЕ');
    getToken('http://yova.praid.com.ua/api/login')
      .then(data => data.data['api_token'])
      .then(token =>  {
        Promise.all(
          [
            getData("http://yova.praid.com.ua/api/projects", token, 'work', language, '', 'false'),
          ])
        .then(data => {
          setAllWorks(data[0])
        })
        .catch(err => console.log(err)); 
      })
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
    );
  }  
}
 
export default WorksPage;