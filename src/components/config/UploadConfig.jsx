import React from 'react';
import { connect } from 'react-redux';
import {Input, Radio} from 'antd';
import {updateUploadConfigVal} from '../../reducers-action/action';


class UploadConfig extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (attr, e) => {
        let val = e.target.value;
        const { cIndex } = this.props;
        this.props.dispatch(updateUploadConfigVal(cIndex, attr, val));
    }

    render() {
        const { uploadConfigProps, cIndex } = this.props;
        const curCfg = uploadConfigProps[cIndex];
        return (
            <div className="config-wrapper">
                <header>Upload:</header>
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

                <div className="row-item">
                    <label>是否multiple:</label> 
                    <Radio.Group onChange={(e)=> this.onChange('multiple', e)} value={curCfg && curCfg.multiple}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </div>

            </div>
        )
    }
}

export default connect(state => ({
    uploadConfigProps: state.uploadConfigProps
}))(UploadConfig);