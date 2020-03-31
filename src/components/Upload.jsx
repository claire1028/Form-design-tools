import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateUploadConfigVal} from '../reducers-action/action';
import UploadConfig from './config/UploadConfig.jsx';

const compMap = {
    nodeType: 'upload',
    config: (compIndex) => <UploadConfig cIndex={compIndex}/>
}; 

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.fileRef = null;
        this.fileList = [];
        this.onValidate = this.onValidate.bind(this);
        this.props.getValidate(this.onValidate);
    }

    selectCurItem = (cIndex) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
    }

    componentDidUpdate() {
        this.props.getValidate(this.onValidate);
    }

    handleChange = (e) => {
        const { cIndex, dispatch} = this.props;
        this.fileList = this.fileList.concat([...e.target.files]);
        dispatch(updateUploadConfigVal(cIndex, 'value', this.fileList));
        dispatch(updateUploadConfigVal(cIndex, 'err', ''));
    }

    onDelete = (index) => {
        const { cIndex, dispatch} = this.props;
        this.fileList = [...this.fileList.slice(0, index), ...this.fileList.slice(index + 1)];
        dispatch(updateUploadConfigVal(cIndex, 'value', this.fileList));
    }

    onValidate(cIndex) {
        const { uploadConfigProps, dispatch} = this.props;
        const cfg = uploadConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateUploadConfigVal(cIndex, 'err', '请上传'));
            return;
        }
        dispatch(updateUploadConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'upload';
        return {[nameVal]: value};

    }

    render() {
        const { uploadConfigProps, cIndex } = this.props;
        const curConfig = uploadConfigProps[cIndex];
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label className="file-label">
                    {curConfig && curConfig.required && <span>*</span>}
                    {curConfig && curConfig.label || 'Upload'}
                </label>
                <div className="element">
                    <div style={{width: '100%'}}>
                        <a className="file" href="#!">
                            Click to Upload
                            <input type="file" onChange={this.handleChange} 
                                ref={ref => this.fileRef = ref}
                                multiple={curConfig && curConfig.multiple}
                            />
                        </a>
                        <ul className="file-list">
                            {curConfig && curConfig.value && curConfig.value.map((v, i) => 
                                <li key={i}>
                                    {v.name}
                                    <span onClick={() => this.onDelete(i)}>delete</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <p className="tip">{curConfig && curConfig.err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    uploadConfigProps: state.uploadConfigProps
}))(Upload);