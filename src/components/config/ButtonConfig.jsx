import React from 'react';
import { connect } from 'react-redux';
import { Select, Input } from 'antd';
import { updateBtnConfigVal } from '../../reducers-action/action';

const { Option } = Select;

class ButtonConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    onSelectChange = (attr, value) => {
        this.props.dispatch(updateBtnConfigVal(this.props.cIndex, attr, value));
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
                this.props.dispatch(updateBtnConfigVal(cIndex, attr, {}));
                return;
            }
        }
        this.setState({ hasError: false });
        this.props.dispatch(updateBtnConfigVal(cIndex, attr, val));
    }
    render() {
        const { btnConfigProps, cIndex } = this.props;
        const curCfg = btnConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Button:</header>
                <div className="row-item">
                    <label>按钮文字:</label>
                    <Input placeholder="button text" style={{ width: 180 }} onChange={(e) => this.onChange('text', e)}
                        value={curCfg && curCfg.text}
                    />
                </div>
                <div className="row-item">
                    <label>按钮类型:</label>
                    <Select
                        placeholder="Select a type"
                        style={{ width: 150 }}
                        onChange={(val) => this.onSelectChange('type', val)}
                        value={curCfg && curCfg.type}
                    >
                        <Option value="submit">submit</Option>
                        <Option value="reset">reset</Option>
                        <Option value="button">button</Option>
                    </Select>
                </div>
                {/* <div className="row-item">
                    <label>按钮名称:</label>
                    <Input
                        placeholder="button name"
                        style={{ width: 180 }}
                        onChange={(e) => this.onChange('name', e)}
                        value={curCfg && curCfg.name}
                    />
                </div>
                <div className="row-item">
                    <label>按钮值:</label>
                    <Input placeholder="button value" style={{ width: 180 }} onChange={(e) => this.onChange('value', e)}
                        value={curCfg && curCfg.value}
                    />
                </div> */}
                <div className="row-item">
                    <label>按钮样式:</label>
                    <Input.TextArea placeholder="button style" style={{ width: 180 }} onChange={(e) => this.onChange('style', e)}
                        value={
                            !this.state.hasError ? curCfg && JSON.stringify(curCfg.style) : this.state && this.state['style' + cIndex]
                        }
                    />
                    <p style={{ color: 'orange', marginLeft: 83 }}>为json格式</p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    btnConfigProps: state.btnConfigProps
}))(ButtonConfig);