import { storeFactory } from '../testUtilits/index'; 
import { 
  setMenuShow, 
  setScreenWidth, 
  setIsLoaded, 
  changeLanguage, 
  setFeatured,
  setAllWorks,
  setAllSocialities,
  setAllText, 
  setCurrentWorkData,
  setAboutPage,
  setContactPage
} from '../store/actions';

// SETMENUSHOW DISPATCHER
describe('setMenuShow action dispatcher', () => {
  let store; 
  const initialState = {
    menuShow: false
  }
  beforeEach(() => {
    store = storeFactory(initialState); 
  })

  test('show menu === true', () => {
    store.dispatch(setMenuShow(true)); 
    const expectedState = {
      menuShow: true
    }
    let newStore = store.getState(); 
    expect(newStore).toEqual(expectedState)
  })

  test('unshow menu when show menu === false', () => {
    store.dispatch(setMenuShow(false));
    const expectedState = {
      menuShow: false
    }
    let newStore = store.getState();
    expect(newStore).toEqual(expectedState)
  })
})

// SETSCREENWIDTH DISPATCHER
describe('setScreenWidth action dispatcher', () => {
  let store; 
  const initialStore = {
    screenWidth: 1440
  }
  beforeEach(() => {
    store = storeFactory(initialStore);
  })

  test('setScreenWidth 560px', () => {
    store.dispatch(setScreenWidth(560));
    const expectedStore = {
      screenWidth: 560
    }
    let newStore = store.getState();
    expect(newStore).toEqual(expectedStore)
  })

  test('setScreenWidth 320px', () => {
    store.dispatch(setScreenWidth(320));
    const expectedStore = {
      screenWidth: 320
    }
    let newStore = store.getState();
    expect(newStore).toEqual(expectedStore)
  })

  test('setScreenWidth 1600px', () => {
    store.dispatch(setScreenWidth(1600));
    const expectedStore = {
      screenWidth: 1600
    }
    let newStore = store.getState();
    expect(newStore).toEqual(expectedStore)
  })
})

//SETISLOADED DISPATCHER

describe('setIsLoaded action dispatcher', () => {
  let store; 
  const initialState = {
    isLoaded: true
  }; 
  beforeEach(() => {
    store = storeFactory(initialState)
  })

  test('dispatch setIsLoaded with true', () => {
    const expectedStore = {
      isLoaded: true
    }
    let newStore = store.getState(); 
    expect(newStore).toEqual(expectedStore)
  })

  test('dispatch setIsLoaded with false', () => {
    store.dispatch(setIsLoaded(false))
    const expectedStore = {
      isLoaded: false
    }
    let newStore = store.getState(); 
    expect(newStore).toEqual(expectedStore)
  })
})

//CHANGELANGUAGE DISPATCHER
describe('setLanguage action dispatcher', () => {
  let store; 
  const initialStore = {
    language: 'en'
  }
  beforeEach(() => {
    store = storeFactory(initialStore);
  })

  test('dispatch setLanguage when language === en', () => {
    const expectedStore = {
      language: 'en',
    }
    const newStore = store.getState();
    expect(newStore).toEqual(expectedStore)
  })

  test('dispatch setLanguage when language === ua', () => {
    store.dispatch(changeLanguage('ua'))
    const expectedStore = {
      language: 'ua',
    }
    const newStore = store.getState();
    expect(newStore).toEqual(expectedStore)
  })
})

//SETFEATURED DISPATCH
describe('setFeatured action dispatcher', () => {
  let store; 
  const initialStore = {
    featured: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore);
  })

  test('check that featured === false without errors', () => {
    let expectedStore = {
      featured: false
    }
    const newStore = store.getState(); 
    expect(newStore).toEqual(expectedStore)
  })

  test('dispatch action with one work in featured', () => {
    const featured = [{
      id: 1, 
      location: "Antonovicha st., 6, Kiev,Ukraine", 
      title: "The Perception of Childhood",
      type: "works",
      url_name: "Cityzen new",
      alias: "the-perception-of-childhood"
    }]
    store.dispatch(setFeatured(featured)); 
    let newStore = store.getState();
    expect(newStore.featured).toEqual(featured)
  })

  test('dispatch action with 4 work in featured', () => {
    const featured = []; 
    const work = {
      id: 1, 
      location: "Antonovicha st., 6, Kiev,Ukraine", 
      title: "The Perception of Childhood",
      type: "works",
      url_name: "Cityzen new",
      alias: "the-perception-of-childhood"
    }
    for (let i = 0; i < 4; i++) {
      work.id = i; 
      featured.push(work); 
    }
    store.dispatch(setFeatured(featured)); 
    let newStore = store.getState();
    expect(newStore.featured).toEqual(featured)
  })
})

//SETWORKS DISPATCH
describe('setWorks action dispatcher', () => {
  let store; 
  let work = {
    alias: "cityzen-cafe",
    categoryID: null,
    category_name: "",
    city_country: "Kyiv, Ukraine",
    created_at: "2020-02-12 12:52:00",
    feature: 0,
    featuredImage: "/storage/works/April2020/6e7eq9RMu4KeDvm1tfs9.png",
    id: 1,
    location: "Bolshaya Zhytomyrska st., 20, Kyiv, Ukraine",
    mainImage: "/storage/works/April2020/oa1bF6AwYt5f5QA6vdP6.jpg",
    play: 0,
    projectImage: "/storage/works/April2020/5uBfp4g329UwIz4TJPVn.jpg",
    title: "Cityzen cafe  ",
    type: "works",
    updated_at: "2020-04-21 14:56:56",
    url_name: "Alltrueeast Vann now",
    video: "https://www.youtube.com/embed/E2iO8A00B5U",
  }
  const initialStore = {
    works: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore)
  })

  test('works with initialState === false', () => {
    const expectedStore = {
      works: false
    }
    const newStore = store.getState(); 
    expect(newStore).toEqual(expectedStore); 
  })

  test('works with one work', () => {
    store.dispatch(setAllWorks([work]));
    let newStore = store.getState();
    expect(newStore.works).toEqual([work])
  })

  test('works state with 5 works', () => {
    let works = []; 
    for (let i = 0; i < 5; i++) {
      work.id = i; 
      works.push(work); 
    }
    store.dispatch(setAllWorks(works));
    let newStore = store.getState()
    expect(newStore.works).toEqual(works)
  })
})

//SETALLSOCIALITIES DISPATCH 
describe('setAllSocialities action dispatcher', () => {
  let store; 
  let sociality = {
    alias: "cityzen-cafe",
    categoryID: null,
    category_name: "",
    city_country: "Kyiv, Ukraine",
    created_at: "2020-02-12 12:52:00",
    feature: 0,
    featuredImage: "/storage/works/April2020/6e7eq9RMu4KeDvm1tfs9.png",
    id: 1,
    location: "Bolshaya Zhytomyrska st., 20, Kyiv, Ukraine",
    mainImage: "/storage/works/April2020/oa1bF6AwYt5f5QA6vdP6.jpg",
    play: 0,
    projectImage: "/storage/works/April2020/5uBfp4g329UwIz4TJPVn.jpg",
    title: "Cityzen cafe  ",
    type: "works",
    updated_at: "2020-04-21 14:56:56",
    url_name: "Alltrueeast Vann now",
    video: "https://www.youtube.com/embed/E2iO8A00B5U",
  }
  const initialStore = {
    allSocialities: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore)
  })

  test('allSocialities with initialState === false', () => {
    const expectedStore = {
      allSocialities: false
    }
    const newStore = store.getState(); 
    expect(newStore).toEqual(expectedStore); 
  })

  test('allSocialities with one sociality', () => {
    store.dispatch(setAllSocialities([sociality]));
    let newStore = store.getState();
    expect(newStore.allSocialities).toEqual([sociality])
  })

  test('allSocialities state with 5 socialities', () => {
    let socialities = []; 
    for (let i = 0; i < 5; i++) {
      sociality.id = i; 
      socialities.push(sociality); 
    }
    store.dispatch(setAllSocialities(socialities));
    let newStore = store.getState()
    expect(newStore.allSocialities).toEqual(socialities)
  })
})

//SETALLTEXT DISPATCH 
describe('setAllText action dispatcher', () => {
  let store; 
  let allText = {
    button_link_en: "View all",
    button_link_ua: "Показати все",
    button_media_en: "Media Kit",
    button_media_ua: "Медіа Комплект",
    button_more_en: "Load More",
    button_more_ua: "Показати ще"
  }
  beforeEach(() => {
    store = storeFactory({ allText: [] });
  })

  test('default value in allText without err', () => {
    let newStore = store.getState(); 
    expect(newStore.allText.length).toBe(0)
  })

  test('allText after dispatch', () => {
    store.dispatch(setAllText(allText)); 
    let newStore = store.getState(); 
    expect(newStore.allText).toEqual(allText)
  })
})

//SETCURRENTWORKDATA DISPATCH
describe('setCurrentWorkData action dispacher', () => {
  let store; 
  const initialStore = {
    currentWorkData: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore)
  })

  test('initial currentWorkData test without error', () => {
    let newStore = store.getState(); 
    expect(newStore.currentWorkData).toBeFalsy()
  })

  test('setCurrentWorkData dispatch correct', () => {
    let expectedStore = {
      alias: "the-perception-of-childhood",
      categoryID: null,
      category_name: "",
      city_country: "Dar es Salaam, Tanzania"
    }
    store.dispatch(setCurrentWorkData(expectedStore))
    let newStore = store.getState(); 
    expect(newStore.currentWorkData).toEqual(expectedStore)
  })
})

//ABOUTPAGE DISPATCH 

describe('setCurrentWorkData action dispacher', () => {
  let store; 
  const initialStore = {
    aboutPage: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore)
  })

  test('initial aboutPage test without error', () => {
    let newStore = store.getState(); 
    expect(newStore.aboutPage).toBeFalsy()
  })

  test('aboutPage dispatch correct', () => {
    let expectedAbout = [{}, []]
    store.dispatch(setAboutPage(expectedAbout))
    let newStore = store.getState(); 
    expect(newStore.aboutPage).toEqual(expectedAbout)
  })
})

//CONTACT DISPATCH 

describe('setCurrentWorkData action dispacher', () => {
  let store; 
  const initialStore = {
    contactPage: false
  }
  beforeEach(() => {
    store = storeFactory(initialStore)
  })

  test('initial contactPage test without error', () => {
    let newStore = store.getState(); 
    expect(newStore.contactPage).toBeFalsy()
  })

  test('contactPage dispatch correct', () => {
    let expectedContact = {}
    store.dispatch(setContactPage(expectedContact))
    let newStore = store.getState(); 
    expect(newStore.contactPage).toEqual(expectedContact)
  })
})
