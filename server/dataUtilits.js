import {getToken, getData} from '../src/store/actions';

export default async (lang = 'en', alias = false) => {
  let token = await getToken('http://yova.praid.com.ua/api/login')
  let state = await Promise.all([
    getData("http://yova.praid.com.ua/api/projects", token.data.api_token, 'feature', lang, '', 'true'),
    getData("http://yova.praid.com.ua/api/projects", token.data.api_token, 'work', lang, '', 'false'),
    getData("http://yova.praid.com.ua/api/projects", token.data.api_token, 'soc', lang, '', 'false'),
    getData("http://yova.praid.com.ua/api/text", token.data.api_token),
    getData("http://yova.praid.com.ua/api/contact", token.data.api_token, '', lang, '', ''),
    getData("http://yova.praid.com.ua/api/about", token.data.api_token, '', lang, '', ''),
    getData("http://yova.praid.com.ua/api/seo", token.data.api_token, '', lang, '', 'true'),
  ])
    .then(data => {
      if (alias) {
        let allWorks = [...data[0], ...data[1], ...data[2]]; 
        let currentId = allWorks.find(work => work.alias == alias).id;
        return getData(`http://yova.praid.com.ua/api/project`, token.data.api_token, '', lang, currentId)
          .then(currentWorkData => {
            return {
              screenWidth: 1440,
              menuShow: false,
              isLoaded: true,
              language: 'en',
              featured: data[0],
              works: data[1],
              allSocialities: data[2],
              currentWorkData: currentWorkData,
              aboutPage: data[5],
              contactPage: data[4],
              allText: data[3],
              seoMeta: data[6]
            }
          })
      } else {
        return {
          screenWidth: 1440,
          menuShow: false,
          isLoaded: true,
          language: 'en',
          featured: data[0],
          works: data[1],
          allSocialities: data[2],
          currentWorkData: false,
          aboutPage: data[5],
          contactPage: data[4],
          allText: data[3],
          seoMeta: data[6]
        }
      }
    })
    return state
}