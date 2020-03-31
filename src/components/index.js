import React from 'react';

import Input from './Input.jsx';
import Button from './Button.jsx';
import Textarea from './Textarea.jsx';
import Radio from './Radio.jsx';
import Checkbox from './Checkbox.jsx';
import Select from './Select.jsx';
import Switch from './Switch.jsx';
import Range from './Range.jsx';
import Upload from './Upload.jsx';
import Date from './Date.jsx';

import InputConfig from './config/InputConfig.jsx';
import ButtonConfig from './config/ButtonConfig.jsx';
import TextareaConfig from './config/TextareaConfig.jsx';
import RadioConfig from './config/RadioConfig.jsx';
import CheckboxConfig from './config/CheckboxConfig.jsx';
import SelectConfig from './config/SelectConfig.jsx';
import SwitchConfig from './config/SwitchConfig.jsx';
import RangeConfig from './config/RangeConfig.jsx';
import UploadConfig from './config/UploadConfig.jsx';
import DateConfig from './config/DateConfig.jsx';

export default [
    {
        nodeType: 'input',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Input cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <InputConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'textarea',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Textarea cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <TextareaConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'radio',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Radio cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <RadioConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'checkbox',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Checkbox cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <CheckboxConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'date',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Date cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <DateConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'upload',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Upload cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <UploadConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'select',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Select cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <SelectConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'switch',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Switch cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <SwitchConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'range',
        valiFunc: null,
        comp: (compIndex, getValidate) => <Range cIndex={compIndex} getValidate={getValidate} />,
        config: (compIndex) => <RangeConfig cIndex={compIndex} />,

    },
    {
        nodeType: 'button',
        comp: (compIndex) => <Button cIndex={compIndex} />,
        config: (compIndex) => <ButtonConfig cIndex={compIndex} />
    }
]