import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateCheckboxConfigVal} from '../reducers-action/action';
import CheckboxConfig from './config/CheckboxConfig.jsx';

const compMap = {
    nodeType: 'checkbox',
    config: (compIndex) => <CheckboxConfig cIndex={compIndex}/>
}; 

class Checkbox extends React.Component {
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
        dispatch(updateCheckboxConfigVal(cIndex, 'value', e.target.checked));
    }

    onValidate(cIndex) {
        const { checkboxConfigProps, dispatch} = this.props;
        const cfg = checkboxConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateCheckboxConfigVal(cIndex, 'err', '请勾选'));
            return;
        }
        dispatch(updateCheckboxConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'checkbox';
        return {[nameVal]: value || false};
    }

    render() {
        const { checkboxConfigProps, cIndex } = this.props;
        const curConfig = checkboxConfigProps[cIndex] || {};
        const {value, err, required, label} = curConfig;
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <input 
                    type="checkbox" 
                    onChange={this.handleChange} 
                    id={`check${cIndex}`}
                    checked={value || false}
                    {...curConfig}
                />
                <div className="element" style={{textAlign: 'left'}}>
                    <label htmlFor={`check${cIndex}`}>
                        {required && <span>*</span>}
                        {label || 'Checkbox'}
                    </label>
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    checkboxConfigProps: state.checkboxConfigProps
}))(Checkbox);