import { combineReducers } from 'redux';
import ActionType from './actionType';

const CONFIG_DEFAULT = {
    cfg: () => {},
    index: 0
};

const nodes = (state = [], action) => {
    switch(action.type) {
        case ActionType.ADD_FORM_ITEM:
            return [
                ...state,
                {
                    index: action.index,
                    component: action.comp
                }
                    
            ];
        case ActionType.DELETE_FORM_ITEM:
            const index = state.map(v => v.index).indexOf(action.index);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        case ActionType.IMPORT_FORM_ITEMS:
            return [...action.comps];
        case ActionType.DRAG_UPDATE:
            return [...action.nodes];
        default:
            return state;
    }
};

const nodeConfig = (state = CONFIG_DEFAULT, action) => {
    switch(action.type) {
        case ActionType.UPDATE_ITEM_CONFIG:
            return {cfg: action.comp.config, type: action.comp.nodeType, index: action.index};
        case ActionType.DELETE_FORM_ITEM:
            return action.index === state.index ? CONFIG_DEFAULT : {...state};
        default:
            return state;
    }
}

const isDraging = (state = false, action) => {
    switch(action.type) {
        case ActionType.IS_DRAGING_ITEM:
            return action.draging;
        default:
            return state;
    }
};

const getAssignFunc = (type, state, action) => {
    switch(action.type) {
        case type:
            const val = {
                ...state,
                [action.compKey]: {
                    ...state[action.compKey],
                    [action.attr]: action.val
                }
            }
            return val;
        case ActionType.CLEAR_FORM_ITEMS_VALUE:
            return {
                ...state,
                [action.compKey]: {
                    ...state[action.compKey],
                    [action.attr]: ''
                }
            }
        default:
            return state;
    }
};

const btnConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_BTN_CONFIG_PROPS, state, action);
}

const inputConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_INPUT_CONFIG_PROPS, state, action);
};

const textareaConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_TEXTAREA_CONFIG_PROPS, state, action);
};

const radioConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_RADIO_CONFIG_PROPS, state, action);
};

const checkboxConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_CHECKBOX_CONFIG_PROPS, state, action);
};

const selectConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_SELECT_CONFIG_PROPS, state, action);
};

const switchConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_SWITCH_CONFIG_PROPS, state, action);
};

const rangeConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_RANGE_CONFIG_PROPS, state, action);
};

const uploadConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_UPLOAD_CONFIG_PROPS, state, action);
};

const dateConfigProps = (state = {}, action) => {
    return getAssignFunc(ActionType.UPDATE_DATE_CONFIG_PROPS, state, action);
};

const submitData = (state = [], action) => {
    switch(action.type) {
        case ActionType.SUBMIT_DATA:
            return [...action.data];
        default:
            return state;
    }
}
const appReducer = combineReducers({
    nodes,
    isDraging,
    nodeConfig,
    btnConfigProps,
    inputConfigProps,
    textareaConfigProps,
    radioConfigProps,
    checkboxConfigProps,
    selectConfigProps,
    switchConfigProps,
    rangeConfigProps,
    uploadConfigProps,
    dateConfigProps,
    submitData
});
  
  export default appReducer;
