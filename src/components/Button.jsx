import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, clearFormItemValue, submitData} from '../reducers-action/action';
import ButtonConfig from './config/ButtonConfig.jsx';

const compMap = {
    nodeType: 'button',
    config: (compIndex) => <ButtonConfig cIndex={compIndex}/>
}; 

class Button extends React.Component {
    selectCurItem = (cIndex, e) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
        e.preventDefault();
    }

    clickBtn = (type, e) => {
        const {nodes, cIndex, dispatch} = this.props;
        const nodesExceptBtn = nodes.filter(v => v.component.nodeType !== 'button');
        const submitVal = [];
        switch (type) {
            case 'reset':
                nodesExceptBtn.forEach(v => {
                    dispatch(clearFormItemValue(v.index, 'value'));
                })
                return;
            case 'submit':
            case 'button':
            default:
                e.preventDefault();
                nodesExceptBtn.forEach(v => {
                    const resVal = v.component.valiFunc(v.index);
                    if(resVal){
                        submitVal.push(resVal);
                    }
                });
                if(submitVal.length === nodesExceptBtn.length) {
                    this.props.dispatch(submitData(submitVal));
                    // console.clear();
                    console.log('Submit Data', submitVal);
                };
                return;
        }
    }
    render() {
        const { btnConfigProps, cIndex } = this.props;
        const curConfig = btnConfigProps[cIndex];
        let txt = 'Submit';
        if(curConfig && curConfig.type) {
            txt = curConfig.type === 'submit' ? 'Submit' : curConfig.type === 'reset' ? 'Reset' : 'Button';
        }
        const dfText = curConfig && curConfig.text || txt;
       
        return (
            <div className="form-item" onClick={(e) => this.selectCurItem(cIndex, e)}>
                <button {...curConfig} onClick={(e) => this.clickBtn(curConfig && curConfig.type, e)}> 
                    {dfText}
                </button>
            </div>
        )
    }
}

export default connect(state => ({
    btnConfigProps: state.btnConfigProps,
    nodes: state.nodes
}))(Button);