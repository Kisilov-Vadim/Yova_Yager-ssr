import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps, storeFactory } from '../../testUtilits/';

import { WorksCard } from './index';

const defaultProps = {
  image: 'String',
  title: 'String',
  location: 'Kiev, Ukraine',
  backgroundPici: true,
  area: 'works',
  link: 'altruist'
}

const defaultState = {
  language: 'en',
  screenWidth: 850
}

let setUp = (initialState={}, props={}) => {
  const store = storeFactory({...defaultState,...initialState});
  const allProps = {...defaultProps, ...props};
  const wrapper = shallow(<WorksCard {...allProps} store={store} />).dive().dive();
  return wrapper;
}

describe('screenWidth more then 850px', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ screenWidth: 1440 });
  })

  test('does not throw error with expected props', () => {
    checkProps(wrapper, defaultProps)
  })

  test('render div when screenWidth > 850px', () => {
    let mainDiv = findByTestAttr(wrapper, 'screenWidth-more-850');
    expect(mainDiv.length).toBe(1)
  })

  test('render background pici animation when backgroundPici === true', () => {
    wrapper = setUp({screenWidth: 1440}, { backgroundPici: true})
    let backgroundPici = findByTestAttr(wrapper, 'background-pici');
    expect(backgroundPici.length).toBe(1);
  })

  test('render background pici animation when backgroundPici === false', () => {
    wrapper = setUp({screenWidth: 1440}, { backgroundPici: false})
    let backgroundPici = findByTestAttr(wrapper, 'background-pici');
    expect(backgroundPici.length).toBe(0);
  })

  test('render hover content block', () => {
    let hoverContent = findByTestAttr(wrapper, 'hover-content');
    expect(hoverContent.length).toBe(1)
  })

  test('render card title', () => {
    wrapper = setUp({}, {title: 'Zmist'})
    let title = findByTestAttr(wrapper, 'Zmist');
    expect(title.length).toBe(1)
  })

  test('render card location', () => {
    wrapper = setUp({}, {location: 'Kiev, Ukraine'})
    let location = findByTestAttr(wrapper, 'Kiev, Ukraine');
    expect(location.length).toBe(1)
  })

  test('render link to work or sociality page', () => {
    wrapper = setUp({}, {area: 'works', link: 'altruist'});
    let link = findByTestAttr(wrapper, '/works/altruist');
    expect(link.length).toBe(1);
  })
})

describe('screenWidth less then 850px', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ screenWidth: 560 });
  })

  test('render div when screenWidth < 850px', () => {
    let mainDiv = findByTestAttr(wrapper, 'screenWidth-less-850');
    expect(mainDiv.length).toBe(1)
  })

  test('render background pici animation', () => {
    wrapper = setUp({screenWidth: 560}, { backgroundPici: true })
    let backgroundPici = findByTestAttr(wrapper, 'background-pici');
    expect(backgroundPici.length).toBe(0);
  })

  test('render hover content block', () => {
    let hoverContent = findByTestAttr(wrapper, 'hover-content');
    expect(hoverContent.length).toBe(1)
  })

  test('render card title', () => {
    wrapper = setUp({}, {title: 'Macdonalds'})
    let title = findByTestAttr(wrapper, 'Macdonalds');
    expect(title.length).toBe(1)
  })

  test('render card location', () => {
    wrapper = setUp({}, {location: 'New York, USA'})
    let location = findByTestAttr(wrapper, 'New York, USA');
    expect(location.length).toBe(1)
  })
})
