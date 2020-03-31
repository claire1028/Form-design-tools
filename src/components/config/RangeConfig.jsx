import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio} from 'antd';
import {updateRangeConfigVal} from '../../reducers-action/action';


class RangeConfig extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        this.props.dispatch(updateRangeConfigVal(cIndex, attr, val));
        
    }

    render() {
        const { rangeConfigProps, cIndex } = this.props;
        const curCfg = rangeConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Range:</header>
                <div className="row-item">
                    <label>Label文字:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.label} onChange={(e) => this.onChange('label', e)}/>
                </div>

                <div className="row-item">
                    <label>name:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.name} onChange={(e) => this.onChange('name', e)}/>
                </div>
                
                <div className="row-item">
                    <label>是否disabled:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('disabled', e)} value={curCfg && curCfg.disabled}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
                <div className="row-item">
                    <label>是否竖向:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('vertical', e)} value={curCfg && curCfg.vertical}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
                <div className="row-item">
                    <label>min值:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.min} onChange={(e) => this.onChange('min', e)}/>
                </div>
                <div className="row-item">
                    <label>max值:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.max} onChange={(e) => this.onChange('max', e)}/>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    rangeConfigProps: state.rangeConfigProps
}))(RangeConfig);