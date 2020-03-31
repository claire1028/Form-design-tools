import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateTextareaConfigVal} from '../reducers-action/action';
import TextareaConfig from './config/TextareaConfig.jsx';

const compMap = {
    nodeType: 'textarea',
    config: (compIndex) => <TextareaConfig cIndex={compIndex}/>
}; 

class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.onValidate = this.onValidate.bind(this);
        this.props.getValidate(this.onValidate);
    }

    selectCurItem = (cIndex) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
    }

    componentDidUpdate() {
        this.props.getValidate(this.onValidate);
    }

    handleChange = (e) => {
        const { cIndex, dispatch} = this.props;
        dispatch(updateTextareaConfigVal(cIndex, 'value', e.target.value));
    }

    onValidate(cIndex) {
        const { textareaConfigProps, dispatch} = this.props;
        const cfg = textareaConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateTextareaConfigVal(cIndex, 'err', '请填写该输入框'));
            return;
        }
        dispatch(updateTextareaConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'textarea';
        return {[nameVal]: value};
    }

    render() {
        const { textareaConfigProps, cIndex } = this.props;
        const curConfig = textareaConfigProps[cIndex] || {};
        const {err, required, label, value} = curConfig;
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label>
                    {required && <span>*</span>}
                    {label || 'Textarea'}
                </label>
                <div className="element">
                    <textarea {...curConfig} onChange={this.handleChange} value={value || ''}/>
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    textareaConfigProps: state.textareaConfigProps
}))(Textarea);