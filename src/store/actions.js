export const ACTIONS = {
  SET_SCREEN_WIDTH: 'SET_SCREEN_WIDTH', 
  SET_MENU_SHOW: 'SET_MENU_SHOW', 
  SET_FEATURED: 'SET_FEATURED',
  SET_WORKS: 'SET_WORKS',  
  SET_ISLOADED: 'SET_ISLOADED', 
  SET_ALLSOCIALITIES: 'SET_ALLSOCIALITIES',
  SET_ALLTEXT: 'SET_ALLTEXT',
  SET_CURRENTWORKPAGE: 'SET_CURRENTWORKPAGE',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE', 
  SET_ABOUT_PAGE: 'SET_ABOUT_PAGE',
  SET_CONTACT_PAGE: 'SET_CONTACT_PAGE'
}

export const setScreenWidth = (width) => ({ type: ACTIONS.SET_SCREEN_WIDTH, width })
export const setMenuShow = (status) => ({ type: ACTIONS.SET_MENU_SHOW, status });
export const setCurrentWorkData = (work) => ({ type: ACTIONS.SET_CURRENTWORKPAGE, work })
export const setIsLoaded = (value) => ({ type: ACTIONS.SET_ISLOADED, value }); 
export const changeLanguage = (language) => ({ type: ACTIONS.CHANGE_LANGUAGE, language });
export const setFeatured = (featured) => ({ type: ACTIONS.SET_FEATURED, featured }); 
export const setAllWorks = (works) => ({ type: ACTIONS.SET_WORKS, works }); 
export const setAllSocialities = (allSocialities) => ({ type: ACTIONS.SET_ALLSOCIALITIES, allSocialities }); 
export const setAllText = (text) => ({ type: ACTIONS.SET_ALLTEXT, text }); 
export const setAboutPage = (about) => ({ type: ACTIONS.SET_ABOUT_PAGE, about });
export const setContactPage = (contact) => ({ type: ACTIONS.SET_CONTACT_PAGE, contact })


export const getToken = async (url) => {
  let response = await fetch(url, {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      email: "admin@admin.com", 
      password: "admin"
    })
  })
  return response.json(); 
}

export const getData = async (url, token, type='', lang, id="", main) => {
  let response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      "api_token": token,
      "type": type,
      "lang": lang,     
      "project_id": id,
      "main": main
    })
  })
  return response.json(); 
}

export const getAllData = (lang) => {

  return (dispatch) => {
    getToken('http://yova.praid.com.ua/api/login')
      .then(data => data.data['api_token'])
      .then(token =>  {
        Promise.all(
          [
            getData("http://yova.praid.com.ua/api/projects", token, 'feature', lang, '', 'true'),
            getData("http://yova.praid.com.ua/api/projects", token, 'work', lang, '', 'true'),
            getData("http://yova.praid.com.ua/api/projects", token, 'soc', lang, '', 'true'),
            getData("http://yova.praid.com.ua/api/text", token)
          ])
          .then(data => {
            dispatch(setFeatured(data[0]))
            dispatch(setAllWorks(data[1]))
            dispatch(setAllSocialities(data[2]))
            dispatch(setAllText(data[3]))
            dispatch(setIsLoaded(true)); 
          })
          .catch(err => console.log(err)); 
      })
  }
}
