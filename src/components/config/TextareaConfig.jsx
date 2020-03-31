import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio} from 'antd';
import {updateTextareaConfigVal} from '../../reducers-action/action';


class TextareaConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
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
                this.props.dispatch(updateTextareaConfigVal(cIndex, attr, {}));
                return;
            }
        }
        this.setState({ hasError: false });
        this.props.dispatch(updateTextareaConfigVal(cIndex, attr, val));
    }

    render() {
        const { textareaConfigProps, cIndex } = this.props;
        const curCfg = textareaConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Textarea:</header>
                <div className="row-item">
                    <label>Label文字:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.label} onChange={(e) => this.onChange('label', e)}/>
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
                    <label>rows:</label> 
                    <Input style={{width: 180}} value={curCfg && curCfg.rows} onChange={(e) => this.onChange('rows', e)}/>
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

                <div className="row-item">
                    <label>输入框样式:</label>
                    <Input.TextArea placeholder="input style" style={{width: 180}} onChange={(e) => this.onChange('style', e)}
                        value={
                            !this.state.hasError ? curCfg && JSON.stringify(curCfg.style) : this.state && this.state['style' + cIndex]
                        }
                    />
                    <p style={{color: 'orange', marginLeft: 98}}>为json格式</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    textareaConfigProps: state.textareaConfigProps
}))(TextareaConfig);