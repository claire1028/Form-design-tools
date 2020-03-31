import React from 'react';
import { connect } from 'react-redux';
import {deleteFormItem, toDrag} from '../reducers-action/action';
import components from '../components';
import axios from 'axios';

import './index.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDrag = (v, e) => {
        this.props.dispatch(toDrag(true));
        e.dataTransfer.setData('type', v.nodeType);
    }

    cancelDrag = () => {
        this.props.dispatch(toDrag(false));
    }

    deleteItem = (nodeindex) => {
        this.props.dispatch(deleteFormItem(nodeindex));
    }

    create = () => {
        axios.get('/api/getForm').then(res => {
            console.log('xxx', res);
        });
    }

    render() {
        const {nodes, nodeConfig} = this.props;
        return (
            <div className="left-wrapper">
                {/* <div className="create">
                    <div className="header">
                        表单
                        <button className="new" onClick={this.create}>新建</button>
                    </div>
                    <main>
                        <div className="item">
                            表单1
                            <button className="del">删除</button>
                        </div>
                    </main>
                </div> */}
                
                <div className="lib">
                    <div className="header">
                        表单元素
                    </div>
                    <main>
                        <ul>
                            {components.map((v, i) => 
                                <li key={i} 
                                    className="element" 
                                    draggable="true" 
                                    onDragStart={(e) => this.handleDrag(v, e)} 
                                    onDragEnd={this.cancelDrag} 
                                    onMouseUp={this.cancelDrag}
                                >
                                    {v.nodeType}
                                </li>
                            )}
                        </ul>
                    </main>
                </div>

                <div className="selected">
                    <div className="header">
                        已添加表单元素
                    </div>
                    <main>
                        <ul>
                            {nodes.map((v, i) => 
                                <li key={i} className={`item ${nodeConfig.index === v.index ? 'active' : ''}`}>
                                    {v.component.nodeType}
                                    <button className="del" onClick={() => this.deleteItem(v.index)}>删除</button>
                                </li>
                            )}
                        </ul>
                        
                    </main>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    nodes: state.nodes,
    nodeConfig: state.nodeConfig
}))(App);