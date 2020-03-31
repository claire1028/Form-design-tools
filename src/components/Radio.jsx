import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateRadioConfigVal} from '../reducers-action/action';
import RadioConfig from './config/RadioConfig.jsx';

const compMap = {
    nodeType: 'radio',
    config: (compIndex) => <RadioConfig cIndex={compIndex}/>
}; 

const DEFAULT_RADIOS = ['1', '2'];
const DEFAULT_LABELS = ['1', '2'];

class Radio extends React.Component {
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
        const v = e.target.value;
        dispatch(updateRadioConfigVal(cIndex, 'value', v));
        dispatch(updateRadioConfigVal(cIndex, 'err', ''));
    }

    onValidate(cIndex) {
        const { radioConfigProps, dispatch} = this.props;
        const cfg = radioConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateRadioConfigVal(cIndex, 'err', '请选择该选项'));
            return;
        }
        dispatch(updateRadioConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'radio';
        return {[nameVal]: value};
    }

    render() {
        const { radioConfigProps, cIndex } = this.props;
        const curConfig = radioConfigProps[cIndex] || {};
        const {values, itemLabels, required, label, name, value} = curConfig;

        const radios = values ? values.split(',') : DEFAULT_RADIOS;
        const labes = itemLabels ? itemLabels.split(',') : DEFAULT_LABELS;
        
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label>
                    {required && <span>*</span>}
                    {label || 'Radio'}
                </label>
                <div className="element"  >
                    {radios.map((v, i) => 
                        <div key={i} style={{textAlign: 'left'}}>
                            <input 
                                type="radio" 
                                checked={v === value}
                                onChange={this.handleChange}
                                value={v}
                                name={name || `radio${cIndex}`}
                                required = {required}
                            />
                            <label>{labes[i]}</label>
                        </div>
                    )}
                    
                    <p className="tip">{curConfig && curConfig.err} </p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    radioConfigProps: state.radioConfigProps
}))(Radio);