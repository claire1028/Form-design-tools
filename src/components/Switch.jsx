import React from 'react';
import { connect } from 'react-redux';
import {getNodeConfig, updateSwitchConfigVal} from '../reducers-action/action';
import SwitchConfig from './config/SwitchConfig.jsx';

const compMap = {
    nodeType: 'switch',
    config: (compIndex) => <SwitchConfig cIndex={compIndex}/>
}; 

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.onValidate = this.onValidate.bind(this);
        this.props.getValidate(this.onValidate);
    }

    switchCurItem = (cIndex) => {
        this.props.dispatch(getNodeConfig(compMap, cIndex));
    }

    componentDidUpdate() {
        this.props.getValidate(this.onValidate);
    }

    handleChange = (val) => {
        const { cIndex, dispatch} = this.props;
        dispatch(updateSwitchConfigVal(cIndex, 'value', val));
    }

    onValidate(cIndex) {
        const { switchConfigProps, dispatch} = this.props;
        const cfg = switchConfigProps[cIndex] || {};
        const {required, value, name} = cfg;
        if(required && !value) {
            dispatch(updateSwitchConfigVal(cIndex, 'err', '请enable该项'));
            return;
        }
        dispatch(updateSwitchConfigVal(cIndex, 'err', ''));
        const nameVal = name || 'switch';
        return {[nameVal]: value || false};
    }

    render() {
        const { switchConfigProps, cIndex } = this.props;
        const curConfig = switchConfigProps[cIndex] || {};
        const {value, disabled, err, required, label, className} = curConfig;

        return (
            <div className="form-item" onClick={() => this.switchCurItem(cIndex)}>
                <label htmlFor={`check${cIndex}`}>
                        {required && <span>*</span>}
                        {label || 'Switch'}
                    </label>
                
                <div className="element" style={{textAlign: 'left'}}>
                    <div
                        onClick={!disabled ? () => this.handleChange(!value) : null}
				        className={`switch ${value ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${className} `}
			        >
                        <div className="ball" />
                    </div>
                    <p className="tip">{err} </p>
                </div>
                
            </div>
        )
    }
}

export default connect(state => ({
    switchConfigProps: state.switchConfigProps
}))(Switch);