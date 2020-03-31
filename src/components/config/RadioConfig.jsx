import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio} from 'antd';
import {updateRadioConfigVal} from '../../reducers-action/action';


class RadioConfig extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        this.props.dispatch(updateRadioConfigVal(cIndex, attr, val));
    }

    render() {
        const { radioConfigProps, cIndex } = this.props;
        const curCfg = radioConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Radio:</header>
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
                    <label>item labels:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.itemLabels} onChange={(e) => this.onChange('itemLabels', e)}/>
                    <p style={{color: 'orange', marginLeft: 80}}>以逗号分隔,如:1,2,3</p>
                </div>

                <div className="row-item">
                    <label>values:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.values} onChange={(e) => this.onChange('values', e)}/>
                    <p style={{color: 'orange', marginLeft: 80}}>以逗号分隔,如:1,2,3</p>
                </div>
                
                <div className="row-item">
                    <label>是否required:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('required', e)} value={curCfg && curCfg.required}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    radioConfigProps: state.radioConfigProps
}))(RadioConfig);