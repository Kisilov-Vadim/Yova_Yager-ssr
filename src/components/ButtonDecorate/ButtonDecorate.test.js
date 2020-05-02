import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps, storeFactory } from '../../testUtilits/index';

import {ButtonDecorate} from './index';

const defaultProps = {
  title: 'English', 
  title_ua: 'Українська',
  id: 'auto', 
  autoStart: true
}

const defaultState = {
  language: 'en'
}

let setUp = (initialState={}, props={}) => {
  const store = storeFactory({...defaultState,...initialState}); 
  const allProps = {...defaultProps, ...props}; 
  const wrapper = shallow(<ButtonDecorate {...allProps} store={store} />).dive().dive();
  return wrapper;
}

describe('ButtonDecorate without DOM errors', () => {
  let wrapper; 
  beforeEach(() => {
    wrapper = setUp();
  })  

  it('buttonDecorate has main div container', () => {
    let decorateButton = findByTestAttr(wrapper, 'decorateButton')
    expect(decorateButton.length).toBe(1)
  })

  it('buttonDecorate has button tag with class .decorateButton-button', () => {
    let button = findByTestAttr(wrapper, 'button')
    expect(button.length).toBe(1)
  })

  test('does not throw error with expected props', () => {
    checkProps(wrapper, defaultProps)
  })

  test('auto start === true without error', () => {
    wrapper = setUp({ autoStart: true }); 
    let svgAutoStart = findByTestAttr(wrapper, 'svg-autostart'); 
    expect(svgAutoStart.length).toBe(1); 
  })

  test('auto start === false without error', () => {
    wrapper = setUp(null, { autoStart: false }); 
    let svgAutoStart = findByTestAttr(wrapper, 'svg-hoverstart'); 
    expect(svgAutoStart.length).toBe(1); 
  })

  test('text inside button when language = en', () => {
    wrapper = setUp({language: 'en'}, {title: 'Media kit', title_ua: 'Медіа набір'});
    let button = findByTestAttr(wrapper, 'button');
    expect(button.text()).toBe('Media kit')
  })

  test('text inside button when language = us', () => {
    wrapper = setUp({language: 'ua'}, {title: 'Media kit', title_ua: 'Медіа набір'});
    let button = findByTestAttr(wrapper, 'button');
    expect(button.text()).toBe('Медіа набір')
  })
})