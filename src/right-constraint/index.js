import React from 'react';
import { connect } from 'react-redux';
import './index.less';

class App extends React.Component {
    render() {
        const {nodeConfig} = this.props;
        return (
            <div className="right-wrapper">
                <header>元素配置</header>
                {nodeConfig.cfg(nodeConfig.index)}
            </div>
        )
    }
}

export default connect(state => ({
    nodeConfig: state.nodeConfig
}))(App);