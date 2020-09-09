import { ACTIONS } from './actions';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// const initialState = {
//   screenWidth: 1440,
//   menuShow: false,
//   isLoaded: false,
//   language: 'en',
//   featured: [],
//   works: false,
//   allSocialities: false,
//   currentWorkData: false,
//   aboutPage: false,
//   contactPage: false,
//   allText: [],
//   seoMeta: [],
// };

const initialState = {
  screenWidth: 1440,
  menuShow: false,
  isLoaded: window.__INITIAL_STORE__.isLoaded || false,
  language: window.__INITIAL_STORE__.language || 'en',
  featured: window.__INITIAL_STORE__.featured || [],
  works: window.__INITIAL_STORE__.works || false,
  allSocialities: window.__INITIAL_STORE__.allSocialities || false,
  currentWorkData: window.__INITIAL_STORE__.currentWorkData || false,
  aboutPage: window.__INITIAL_STORE__.aboutPage || false,
  contactPage: window.__INITIAL_STORE__.contactPage || false,
  allText: window.__INITIAL_STORE__.allText || [],
  seoMeta: window.__INITIAL_STORE__.seoMeta || [],
};

export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_SCREEN_WIDTH:
      return {
        ...state,
        screenWidth: action.width
      }
    case ACTIONS.SET_MENU_SHOW:
      return {
        ...state,
        menuShow: action.status,
      };
    case ACTIONS.SET_FEATURED:
      return {
        ...state,
        featured: action.featured
      }
    case ACTIONS.SET_WORKS:
      return {
        ...state,
        works: action.works
      }
    case ACTIONS.SET_ALLSOCIALITIES:
      return {
        ...state,
        allSocialities: action.allSocialities
      }
    case ACTIONS.SET_ISLOADED:
      return {
        ...state,
        isLoaded: action.value
      }
    case ACTIONS.SET_ALLTEXT:
      return {
        ...state,
        allText: action.text
      }
    case ACTIONS.SET_CURRENTWORKPAGE:
      return {
        ...state,
        currentWorkData: action.work
      }
    case ACTIONS.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      }
    case ACTIONS.SET_ABOUT_PAGE:
      return {
        ...state,
        aboutPage: action.about
      }
    case ACTIONS.SET_CONTACT_PAGE:
      return {
        ...state,
        contactPage: action.contact
      }
    case ACTIONS.SET_SEO:
      return {
        ...state,
        seoMeta: action.seo
      }

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
)

export default store;
