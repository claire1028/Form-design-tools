import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio, Select} from 'antd';
import {updateDateConfigVal} from '../../reducers-action/action';

const { Option } = Select;

class DateConfig extends React.Component {
    constructor(props) {
        super(props);
    }
    onSelectChange = (attr, value) => {
        this.props.dispatch(updateDateConfigVal(this.props.cIndex, attr, value));
    }
    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        this.props.dispatch(updateDateConfigVal(cIndex, attr, val));
    }

    render() {
        const { dateConfigProps, cIndex } = this.props;
        const curCfg = dateConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Date:</header>
                <div className="row-item">
                    <label>Label文字:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.label} onChange={(e) => this.onChange('label', e)}/>
                </div>

                <div className="row-item">
                    <label>name:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.name} onChange={(e) => this.onChange('name', e)}/>
                </div>
                <div className="row-item">
                    <label>className:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.className} onChange={(e) => this.onChange('className', e)}/>
                </div>
                <div className="row-item">
                    <label>是否required:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('required', e)} value={curCfg && curCfg.required}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
                <div className="row-item">
                    <label>是否disabled:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('disabled', e)} value={curCfg && curCfg.disabled}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    dateConfigProps: state.dateConfigProps
}))(DateConfig);