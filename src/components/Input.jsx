import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateInputConfigVal} from '../reducers-action/action';
import InputConfig from './config/InputConfig.jsx';

function debounce(fn, timeout) {
	let timer;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			return fn.apply(this, args);
		}, timeout || 0);
	};
}

const compMap = {
    nodeType: 'input',
    config: (compIndex) => <InputConfig cIndex={compIndex}/>
};

const PATTERN_ERR = '输入有误，请按校验规则输入';

const regex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.patternErr = false;
        const {getValidate} = this.props;
        this.onValidate = this.onValidate.bind(this);
        getValidate && getValidate(this.onValidate);
        this.validateDebounce =  debounce(this.validateFunc, 500);
    }
    
    selectCurItem = (cIndex) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
    }

    componentDidUpdate(prevProps) {
        const {getValidate} = this.props;
        getValidate && getValidate(this.onValidate);
    }

    patternTest = (cIndex) => {
        const {inputConfigProps, dispatch} = this.props;
        const cfg = inputConfigProps[cIndex] || {};
        const {pattern, type, value, tip} = cfg;
        let err = '';

        if(type === 'number') {
            err = /^[0-9]*$/.test(value) ? err : '需为数字';
        }
        if(type === 'email') {
            err = regex.test(value) ? err : '邮箱格式不正确';
        }
        if(pattern) {
            let match = pattern.match(/^\/(.*?)\/([gim]*)$/);
            const reg = new RegExp(match[1], match[2]);
            const hasError = !reg.test(value);
            err = hasError ? tip || PATTERN_ERR : err;
        }
        dispatch(updateInputConfigVal(cIndex, 'err', err));
        return err ? false : true; 
    }

    validateFunc = () => {
        const { cIndex } = this.props;
        this.patternTest(cIndex);
    }

    handleChange = (e) => {
        const { cIndex, dispatch, onChange} = this.props;
        const value = e.target.value;
        dispatch(updateInputConfigVal(cIndex, 'value', value));
        onChange && onChange(value);
        this.validateDebounce();
    }

    onValidate(cIndex) {
        const { inputConfigProps, dispatch } = this.props;
        const cfg = inputConfigProps[cIndex] || {};
        const {required, name, value, type, min, max, minLength, maxLength, tip} = cfg;

        const number = 'number';
        const nameVal = name || 'input';
        let err = '';

        if(required && !value) {
            err = '该输入框必填';
        } else {
            if(type === number) {
                if(min) {
                    err = Number(value) < Number(min) ? `数字需大于${min}`: err;
                }
                if(max){
                    err = Number(value) > Number(max) ? `数字需小于${max}` : err;
                }
            } else {
                if(minLength) {
                    err = value.length < minLength ? `字符长度需大于${minLength}`: err;
                }
                if(maxLength){
                    err = value.length > maxLength ? `字符长度需小于${maxLength}` : err;
                }
            }
        }

        const isPass = this.patternTest(cIndex);

        if(err || !isPass) {
            err ? dispatch(updateInputConfigVal(cIndex, 'err', err)) : ''; 
            return false;
        } 
        
        dispatch(updateInputConfigVal(cIndex, 'err', ''));
        return {[nameVal]: value};
    }
    

    render() {
        const { inputConfigProps, cIndex } = this.props;
        const curConfig = inputConfigProps[cIndex] || {};
        const {required, label, value, placeholder, type, err} = curConfig;
        const txt = type || 'text';
        return (
            <div className="form-item" onClick={() => this.selectCurItem(cIndex)}>
                <label>
                    {required && <span>*</span>}
                    {label || 'Input'}
                </label>
                <div className="element">
                    <input 
                        {...curConfig} 
                        onChange={this.handleChange} 
                        value={value || ''}
                        placeholder={placeholder || `Please input ${txt}`}
                        className={`${err ? 'validate-err' : ''}`}
                    />
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    inputConfigProps: state.inputConfigProps
}))(Input);

