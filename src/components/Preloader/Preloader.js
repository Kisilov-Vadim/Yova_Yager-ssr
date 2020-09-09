import React, {useEffect} from 'react'
import './Preloader.scss'
import $ from 'jquery';

import TextLoop from "react-text-loop";

export default function Preloader() {

  useEffect(() => {
    $('body').css('overflow', 'hidden'); 

    return () => {
      $('body').css('overflow', 'auto'); 
    }
  },[])

  return (
      <div className="loading">
        <div className="loading__main">
          <div className='loading__main-left'>
            {/* <span>Y</span> */}
            <TextLoop interval={300} fade={false} mask={true}>
              <span>Y</span>
              <span>O</span>
              <span>V</span>
              <span>A</span>
            </TextLoop>
          </div>
          <div className="loading__main-right">
            {/* <span>Y</span> */}
            <TextLoop interval={300} fade={false} mask={true}>
              <span>Y</span>
              <span>A</span>
              <span>G</span>
              <span>E</span>
              <span>R</span>
            </TextLoop>
          </div>
        </div>
      </div>
  )
}
