import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import LeftConstraint from './left-constraint';
import RightConstraint from './right-constraint';
import MainConstraint from './main-constraint';
import appReducer from './reducers-action/appReducer';

require('../Mock/api.js');

import './index.less';

const store = createStore(
    appReducer
);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="main-container">
                    <LeftConstraint />
                    <MainConstraint />
                    <RightConstraint />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));