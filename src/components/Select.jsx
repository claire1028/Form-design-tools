import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateSelectConfigVal} from '../reducers-action/action';
import SelectConfig from './config/SelectConfig.jsx';

const compMap = {
    nodeType: 'select',
    config: (compIndex) => <SelectConfig cIndex={compIndex}/>
}; 

const UNIQUE_VAL = 'please choose one item!';
const DEFAULT_OPTIONS = [1, 2, 3];
const DEFAULT_OPTION_LABELS = ['1', '2', '3'];

class Select extends React.Component {
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
        if(e.target.value !== UNIQUE_VAL) {
            dispatch(updateSelectConfigVal(cIndex, 'err', ''));
        }
        dispatch(updateSelectConfigVal(cIndex, 'value', e.target.value));
    }

    onValidate(cIndex) {
        const { selectConfigProps, dispatch} = this.props;
        const cfg = selectConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && (!value || value === UNIQUE_VAL)) {
            dispatch(updateSelectConfigVal(cIndex, 'err', '请选择该项'));
            return;
        }
        dispatch(updateSelectConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'select';
        return {[nameVal]: value};
    }

    render() {
        const { selectConfigProps, cIndex } = this.props;
        const curConfig = selectConfigProps[cIndex] || {};
        const { options, labels, required, label, err} = curConfig;

        const optionsVal = options ? options.split(',') : DEFAULT_OPTIONS;
        const optLabels = labels ? labels.split(',') : DEFAULT_OPTION_LABELS;
        
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label htmlFor={`check${cIndex}`}>
                        {required && <span>*</span>}
                        {label || 'Select'}
                    </label>
                
                <div className="element" style={{textAlign: 'left'}}>
                    <select 
                        type="select" 
                        onChange={this.handleChange} 
                        id={`check${cIndex}`}
                        {...curConfig}
                    >
                        <option value={UNIQUE_VAL}>请选择...</option>
                        {
                            optionsVal.map((v, i) => 
                                <option value={v} key={i}>{optLabels[i]}</option>
                            )
                        }
                    </select>
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    selectConfigProps: state.selectConfigProps
}))(Select);