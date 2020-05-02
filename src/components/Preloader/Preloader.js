import React, {Suspense} from 'react'
import './Preloader.scss'

import TextLoop from "react-text-loop";

export default function Preloader() {
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
