import React from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import {getNodeConfig, updateDateConfigVal} from '../reducers-action/action';
import DateConfig from './config/DateConfig.jsx';

const compMap = {
    nodeType: 'date',
    config: (compIndex) => <DateConfig cIndex={compIndex}/>
}; 

class Dates extends React.Component {
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

    handleChange = (date, dateString) => {
        const { cIndex, dispatch} = this.props;
        dispatch(updateDateConfigVal(cIndex, 'value', dateString));
        dateString ? dispatch(updateDateConfigVal(cIndex, 'err', '')) : '';
    }

    onValidate(cIndex) {
        const { dateConfigProps, dispatch} = this.props;
        const cfg = dateConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateDateConfigVal(cIndex, 'err', '请选择该项'));
            return;
        }
        dispatch(updateDateConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'date';
        return {[nameVal]: value};
    }

    render() {
        const { dateConfigProps, cIndex } = this.props;
        const curConfig = dateConfigProps[cIndex] || {};
        const {err, required, label, disabled, value, className} = curConfig;
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label htmlFor={`check${cIndex}`}>
                    {required && <span>*</span>}
                    {label || 'Date'}
                </label>
                <div className="element" style={{textAlign: 'left'}}>
                    <DatePicker
                        className={`date-picker ${className}`}
                        onChange={this.handleChange}
                        disabled={disabled}
                        value={value ? moment(value, 'YYYY-MM-DD') : null}
                    />
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    dateConfigProps: state.dateConfigProps
}))(Dates);