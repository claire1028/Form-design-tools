import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio} from 'antd';
import {updateCheckboxConfigVal} from '../../reducers-action/action';


class CheckboxConfig extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        this.props.dispatch(updateCheckboxConfigVal(cIndex, attr, val));
    }

    render() {
        const { checkboxConfigProps, cIndex } = this.props;
        const curCfg = checkboxConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Checkbox:</header>
                <div className="row-item">
                    <label>Label文字:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.label} onChange={(e) => this.onChange('label', e)}/>
                </div>

                <div className="row-item">
                    <label>name:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.name} onChange={(e) => this.onChange('name', e)}/>
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
    checkboxConfigProps: state.checkboxConfigProps
}))(CheckboxConfig);