import React from 'react';
import { connect } from 'react-redux';
import {Select, Input, Radio} from 'antd';
import {updateInputConfigVal} from '../../reducers-action/action';

const options = ['text', 'number', 'password', 'email'];

const { Option } = Select;

class InputConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectVal: '',
            hasError: false
        }
    }

    onSelectChange = (attr, value) => {
        this.setState({selectVal: value});
        this.props.dispatch(updateInputConfigVal(this.props.cIndex, attr, value));
    }

    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        const styleVar = 'style' + cIndex;
        if (attr === 'style') {
            try {
                this.setState({ [styleVar]: e.target.value });
                val = JSON.parse(val);
            } catch (err) {
                this.setState({ hasError: true });
                this.props.dispatch(updateInputConfigVal(cIndex, attr, {}));
                return;
            }
        }
        this.setState({ hasError: false });
        this.props.dispatch(updateInputConfigVal(cIndex, attr, val));
    }

    render() {
        const { inputConfigProps, cIndex } = this.props;
        const curCfg = inputConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Input:</header>
                <div className="row-item">
                    <label>Label文字:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.label} onChange={(e) => this.onChange('label', e)}/>
                </div>

                <div className="row-item">
                    <label>输入框类型:</label> 
                    <Select
                        placeholder="Select a type"
                        style={{ width: 150 }}
                        onChange={(val) => this.onSelectChange('type', val)}
                        value={curCfg && curCfg.type}
                    >
                        {options.map((v, i) => 
                            <Option key={i} value={v}>
                                {v}
                            </Option>
                        )}
                    </Select>
                </div>

                <div className="row-item">
                    <label>name:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.name} onChange={(e) => this.onChange('name', e)}/>
                </div>

                <div className="row-item">
                    <label>value:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.value} onChange={(e) => this.onChange('value', e)}/>
                </div>

                <div className="row-item">
                    <label>placeholder:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.placeholder} onChange={(e) => this.onChange('placeholder', e)}/>
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

                {
                    this.state.selectVal === 'number' ?
                    <React.Fragment>
                        <div className="row-item">
                            <label>min值:</label> 
                            <Input style={{width: 180}} onChange={(e) => this.onChange('min', e)} value={curCfg && curCfg.min}/>
                        </div>
                        <div className="row-item">
                            <label>max值:</label> 
                            <Input style={{width: 180}} onChange={(e) => this.onChange('max', e)} value={curCfg && curCfg.max}/>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                         <div className="row-item">
                            <label>minlength值:</label> 
                            <Input style={{width: 180}} onChange={(e) => this.onChange('minLength', e)} value={curCfg && curCfg.minLength}/>
                        </div>
                        <div className="row-item">
                            <label>maxlength值:</label> 
                            <Input style={{width: 180}} onChange={(e) => this.onChange('maxLength', e)} value={curCfg && curCfg.maxLength}/>
                        </div>
                    </React.Fragment>
                }

                <div className="row-item">
                    <label>校验规则:</label> 
                    <Input style={{width: 180}} onChange={(e) => this.onChange('pattern', e)} value={curCfg && curCfg.pattern}/>
                    <p style={{color: 'orange', marginLeft: 84}}>正则表达式：如/\d/g</p>
                </div>

                <div className="row-item">
                    <label>校验错误提示:</label> 
                    <Input style={{width: 180}} onChange={(e) => this.onChange('tip', e)} value={curCfg && curCfg.tip}/>
                </div>

                <div className="row-item">
                    <label>输入框样式:</label>
                    <Input.TextArea placeholder="input style" style={{width: 180}} onChange={(e) => this.onChange('style', e)}
                        value={
                            !this.state.hasError ? curCfg && JSON.stringify(curCfg.style) : this.state && this.state['style' + cIndex]
                        }
                    />
                    <p style={{color: 'orange', marginLeft: 98}}>{`为json格式，如：{"color": "red"}`}</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    inputConfigProps: state.inputConfigProps
}))(InputConfig);