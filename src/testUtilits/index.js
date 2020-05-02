import checkPropTypes from 'check-prop-types';
import {reducer} from '../store/store';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

/**
 * Find dom elem in component by data-test attr
 * @param {ShallowWrapper} wrapper - component shallow 
 * @param {string} val - data-test value
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`); 
}

/**
 * Check component on propsTypes
 * @param {Shallow component} component 
 * @param {object} props - object with props
 */

export const checkProps = (component, props) => {
  const propError = checkPropTypes(
    component.props, 
    props, 
    'props',
    component.name
  )
  expect(propError).toBeUndefined(); 
}

/**
 * Return store with reducer and initinal state
 * @param {Object} initialState - initial state in test
 */

const middlewares = [ReduxThunk]; 
// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const storeFactory = (initialState) => {
  const createStoreWithMiddleWare = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleWare(reducer, initialState); 
}

