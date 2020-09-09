import React from 'react';
import {shallow} from 'enzyme';
import {Featured} from './index'; 
import { findByTestAttr, checkProps, storeFactory } from '../../testUtilits/index'; 

const defaultStore = {
  screenWidth: 1440,
  featured: [],
  language: 'en', 
  allText: {}, 
}

let setUp = (store={}) => {
  let initialStore = storeFactory({...defaultStore, ...store}); 
  let wrapper = shallow(<Featured store={initialStore} />).dive().dive()
  return wrapper
}

describe('props in featured component without err', () => {
  let wrapper = setUp();
  test('check props in component', () => {
    checkProps(wrapper, defaultStore)
  })
})

describe('render featured component without err whith language === en', () => {
  let wrapper; 
  beforeEach(() => {
    wrapper = setUp(); 
  }) 

  test('render featured main div', () => {
    let main = findByTestAttr(wrapper, 'featured-main'); 
    expect(main.length).toBe(1)
  })

  test('render title', () => {
    let title = findByTestAttr(wrapper, 'title-en');
    expect(title.length).toBe(1); 
  })

  test('render projects gallery', () => {
    let gallery = findByTestAttr(wrapper, 'featured-projects');
    expect(gallery.length).toBe(1)
  })
})

describe('render featured component without err whith language === ua', () => {
  let wrapper; 
  beforeEach(() => {
    wrapper = setUp({ language: 'ua' }); 
  }) 

  test('render featured main div', () => {
    let main = findByTestAttr(wrapper, 'featured-main'); 
    expect(main.length).toBe(1)
  })

  test('render title when', () => {
    let title = findByTestAttr(wrapper, 'title-ua');
    expect(title.length).toBe(1); 
  })

  test('render projects gallery', () => {
    let gallery = findByTestAttr(wrapper, 'featured-projects');
    expect(gallery.length).toBe(1)
  })
})