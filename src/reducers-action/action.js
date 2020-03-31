import ActionType from './actionType';

export const addFormItem = (comp, index) => {
    return {
      type: ActionType.ADD_FORM_ITEM,
      comp,
      index
    }
};

export const deleteFormItem = (index) => {
    return {
        type: ActionType.DELETE_FORM_ITEM,
        index
    }
};

export const getNodeConfig = (comp, index) => {
    return {
        type: ActionType.UPDATE_ITEM_CONFIG,
        comp,
        index
    }
};

const updateConfig = (type, compKey, attr, val) => {
    return {
        type,
        attr,
        val,
        compKey
    };
}

export const updateBtnConfigVal = (compKey, attr, val) => {
    return updateConfig(ActionType.UPDATE_BTN_CONFIG_PROPS, compKey, attr, val);
}

export const updateInputConfigVal = (compKey, attr, val) => {
    return updateConfig(ActionType.UPDATE_INPUT_CONFIG_PROPS, compKey, attr, val);
};

export const updateTextareaConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_TEXTAREA_CONFIG_PROPS, compKey, attr, val);
};

export const updateRadioConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_RADIO_CONFIG_PROPS, compKey, attr, val);
};

export const updateSelectConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_SELECT_CONFIG_PROPS, compKey, attr, val);
};

export const updateCheckboxConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_CHECKBOX_CONFIG_PROPS, compKey, attr, val);
};

export const updateSwitchConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_SWITCH_CONFIG_PROPS, compKey, attr, val);
};

export const updateRangeConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_RANGE_CONFIG_PROPS, compKey, attr, val);
};

export const updateUploadConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_UPLOAD_CONFIG_PROPS, compKey, attr, val);
};

export const updateDateConfigVal = (compKey, attr, val) => {
    return  updateConfig(ActionType.UPDATE_DATE_CONFIG_PROPS, compKey, attr, val);
};

export const clearFormItemValue = (compKey, attr) => {
    return {
        type: ActionType.CLEAR_FORM_ITEMS_VALUE,
        attr,
        compKey
    }
}

export const importForm = (comps) => {
    return {
        type: ActionType.IMPORT_FORM_ITEMS,
        comps
    }
};

export const toDrag = (draging) => {
    return {
        type: ActionType.IS_DRAGING_ITEM,
        draging
    }
};

export const submitData = (data) => {
    return {
        type: ActionType.SUBMIT_DATA,
        data
    }
};

export const dragUpdate = (nodes) => {
    return {
        type: ActionType.DRAG_UPDATE,
        nodes
    }
}