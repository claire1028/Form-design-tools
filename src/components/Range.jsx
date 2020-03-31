import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import {getNodeConfig, updateRangeConfigVal} from '../reducers-action/action';
import RangeConfig from './config/RangeConfig.jsx';
import 'rc-slider/assets/index.css';

const compMap = {
    nodeType: 'range',
    config: (compIndex) => <RangeConfig cIndex={compIndex}/>
}; 

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const SliderWithTip = createSliderWithTooltip(Slider);

const reg = /^[0-9]*$/;
const DEFAULT_MIN_VAL = 1;
const DEFAULT_MAX_VAL = 100;

class Range extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleErr: ''
        };
        this.onValidate = this.onValidate.bind(this);
        this.props.getValidate(this.onValidate);
    }

    selectCurItem = (cIndex) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
    }

    componentDidUpdate() {
        this.props.getValidate(this.onValidate);
    }

    handleChange = (val) => {
        const { cIndex, dispatch} = this.props;
        dispatch(updateRangeConfigVal(cIndex, 'value', val));
    }

    onValidate(cIndex) {
        const { rangeConfigProps, dispatch} = this.props;
        const cfg = rangeConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateRangeConfigVal(cIndex, 'err', '请选择'));
            return;
        }
        dispatch(updateRangeConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'range';
        return {[nameVal]: value};
    }

    render() {
        const { rangeConfigProps, cIndex } = this.props;
        const curConfig = rangeConfigProps[cIndex];
        const {vertical, disabled, min, max, value, className} = curConfig || {};
        const minV = reg.test(min) ? Number(min) : DEFAULT_MIN_VAL;
        const maxV = reg.test(max) ? Number(max) : DEFAULT_MAX_VAL;

        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label htmlFor={`check${cIndex}`}>
                    {curConfig && curConfig.required && <span>*</span>}
                    {curConfig && curConfig.label || 'Range'}
                </label>
                
                <div className="element" style={{textAlign: 'left', height: vertical ? 200 : 'auto'}}>
                    <SliderWithTip 
                        disabled={disabled} 
                        min={minV} 
                        max={maxV} 
                        className={`slider ${className}`}
                        vertical={vertical}
                        value={value}
                        tipProps={{
                            placement: vertical ? 'right' : 'top',
                            prefixCls: 'rc-slider-tooltip',
                            overlay: curConfig && curConfig.value
                        }}
                        marks={{ [minV]: minV, [maxV]: maxV}}
                        onChange={this.handleChange}
                    />
                    <p className="tip">{this.state.ruleErr} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    rangeConfigProps: state.rangeConfigProps
}))(Range);