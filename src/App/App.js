import React, { useEffect, useState, Suspense } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

import {Header} from '../components/Header/index';
import {Footer} from '../components/Footer/index';
import {MainPage} from '../pages/MainPage/index';
import {WorksPage} from '../pages/WorksPage/index';
import {SocialityPage} from '../pages/SocialityPage/index';
import {About} from '../pages/About/index';
import {WorkPage} from '../pages/WorkPage/index';
import {Contact} from '../pages/Contact/index';
import Preloader from '../components/Preloader/Preloader';
import Error from '../pages/Error/Error';

const App = ({isLoaded, getAllData, works, allSocialities, language, featured}) => {

  useEffect(() => {
    getAllData(language)
  }, [])

    if (!isLoaded) {
      return (
        <Preloader />
      )
    } else {
      return (
        <>
          <Header />
            <Switch>
              {(featured || []).map(feature =>
                <Route exact={true} path={`/${feature.type}/${feature.alias}`} key={feature.id} component={
                  () => <WorkPage id={feature.id} area={feature.type} />} />
              )}
              {(works || []).map(work =>
                <Route exact={true} path={`/works/${work.alias}`} key={work.id} component={
                  () => <WorkPage id={work.id} area={work.type} />} />
              )}
              {(allSocialities || []).map(sociality =>
                <Route exact={true} path={`/socialities/${sociality.alias}`}  key={sociality.id} component={
                  () => <WorkPage id={sociality.id} area={sociality.type} />} />
              )}
              <Route exact={true} path="/" component={MainPage} />
              <Route exact={true} path="/works" component={WorksPage} />
              <Route exact={true} path="/sociality" component={SocialityPage} />
              <Route exact={true} path="/about" component={About} />
              <Route exact={true} path="/contacts" component={Contact} />
              <Error />
            </Switch>
              <div className="menu__front"></div>
          <Footer />
        </>
      );
    }
}

export default App;
