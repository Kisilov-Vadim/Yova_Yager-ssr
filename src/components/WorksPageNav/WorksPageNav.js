import React from 'react';
import './WorksPageNav.scss';

const WorksPageNav = ({setFilter, filter, categories, language}) => {
  
  return (  
    <>
      
      {
        categories.length === 0 
          ? 
            null 
          :  
            <div className="workspage__nav-sort">
              {categories.map(item => (
                <button 
                  key={item}
                  onClick={() => setFilter(item)} 
                  className={filter === `${item}` ? "workspage__nav-sort-active" : null}
                >
                  {item}
                </button>
              ))}
            </div>
      }
    </>
  );
}
 
export default WorksPageNav;