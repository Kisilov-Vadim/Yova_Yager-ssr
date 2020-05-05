//Node modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import "isomorphic-fetch";

//React modules
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';

//React Components
import {App} from '../src/App/index';

//React store and actions
import {reducer} from '../src/store/store';
import {getToken, getData} from '../src/store/actions';

//Create server
const PORT = 3000;

const app = express()

const metaTagsInstance = MetaTagsServer();

//get full content for div#root
const getSSRHtml = (url, state) => {
  const context = {state}
  const store = createStore(reducer, state);
  return ReactDOMServer.renderToString(
    <StaticRouter context={context} location={url}>
      <Provider store={store}>
         <MetaTagsContext extract = {metaTagsInstance.extract}>
           <App />
         </MetaTagsContext>
      </Provider>
    </StaticRouter>
  )
}

getToken('http://yova.praid.com.ua/api/login')
  .then(data => data.data['api_token'])
  .then(token =>  {
    Promise.all(
      [
        getData("http://yova.praid.com.ua/api/projects", token, 'feature', 'en', '', 'true'),
        getData("http://yova.praid.com.ua/api/projects", token, 'work', 'en', '', 'false'),
        getData("http://yova.praid.com.ua/api/projects", token, 'soc', 'en', '', 'false'),
        getData("http://yova.praid.com.ua/api/text", token),
        getData("http://yova.praid.com.ua/api/contact", token, '', 'en', '', ''),
        getData("http://yova.praid.com.ua/api/about", token, '', 'en', '', '')
      ])
      .then(data => ({
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
          allText: data[3]
        }))
      .then(state => {

        const allPersonalPages = [...state.featured, ...state.works, ...state.allSocialities]

        // get current work or sociality page
        for (let i = 0; i < allPersonalPages.length; i++) {
          app.get(`/${allPersonalPages[i].type}/${allPersonalPages[i].alias}`, (req, res, next) => {
            getToken('http://yova.praid.com.ua/api/login')
              .then(data => data.data['api_token'])
              .then(token => {
                getData(`http://yova.praid.com.ua/api/project`, token, '', 'en', allPersonalPages[i].id)
                  .then(data => {
                    state.currentWorkData = data;
                    const html = getSSRHtml(req.url, state);
                    const meta = metaTagsInstance.renderToString();
                    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
                      if(err) {
                        console.log(err)
                        return res.status(500).send('Some error happend')
                      }
                      return res.send(
                        data.replace('<head>', `<head>${meta}`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                      )
                    })
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })
        }

        // get /about /contacts /works /allSocialities
        app.get('*', (req, res, next) => {
          const meta = metaTagsInstance.renderToString();
          const html = getSSRHtml(req.url, state);
          fs.readFile(path.resolve('build/index.html'), 'utf-8', (err, data) => {
            if(err) {
              console.log(err)
              return res.status(500).send('Some error happend')
            }
            return res.send(
              data.replace('<head>', `<head>${meta}`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
            )
          })
        })
      })
    })
    .catch(err => console.log(err))

// get home page
app.get('/', (req, res, next) => {
  getToken('http://yova.praid.com.ua/api/login')
    .then(data => data.data['api_token'])
    .then(token =>  {
      Promise.all(
        [
          getData("http://yova.praid.com.ua/api/projects", token, 'feature', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/projects", token, 'work', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/projects", token, 'soc', 'en', '', 'true'),
          getData("http://yova.praid.com.ua/api/text", token),
          getData("http://yova.praid.com.ua/api/contact", token, '', 'en', '', ''),
          getData("http://yova.praid.com.ua/api/about", token, '', 'en', '', '')
        ])
        .then(data => {
          const state = {
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
            allText: data[3]
          }
          const meta = metaTagsInstance.renderToString();
          const html = getSSRHtml(req.url, state);
          fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
            if(err) {
              console.log(err)
              return res.status(500).send('Some error happend')
            }
            return res.send(
              data.replace('<head>', `<head>${meta}`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
            )
          })
        })
          .catch(err => console.log(err))
      })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
  console.log(`Shirsnyaga on ${PORT} port` )
})
