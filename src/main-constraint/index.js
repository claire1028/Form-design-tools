import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {addFormItem, getNodeConfig, importForm, dragUpdate} from '../reducers-action/action';
import components from '../components';

import './index.less';

let COMP_INDEX = 0;

const getCompByType = (type) => {
    return components.filter(v => v.nodeType === type);
};

const getCompIndex = () => {
    return ++COMP_INDEX;
};

const readJSON = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(JSON.parse(reader.result));
      reader.readAsText(file);
    });
};

const purify = (json) => {
    const types = components.map(v => v.nodeType)
    const data = json.filter(v => {
        return types.indexOf(typeof(v) === 'string' ? v : v.nodeType) > -1
    });
    return data.map(v => {
        return {
            index: getCompIndex(), 
            component: components.filter(val => val.nodeType === (typeof(v) === 'string' ? v : v.nodeType))[0]
        };
    });  
};

// 设置样式
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 8,
  margin: `0 0 8px 0`,
  background: isDragging ? '#1890ff' : '',
  ...draggableStyle
}); 

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getListStyle = () => ({
  width: '100%'
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.wrpRef = null;
        this.fileRef = null;
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.props.nodes,
          result.source.index,
          result.destination.index
        );
        this.props.dispatch(dragUpdate(items));

    }

    componentDidMount() {
        this.wrpRef.addEventListener('drop', this.onDrop);
        this.wrpRef.addEventListener('dragover', this.onDrapover);
    }
    
    onDrapover = (event) => {
        event.preventDefault();
    };

    onDrop = (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('type');
        const val = getCompByType(type)[0];
        const index = getCompIndex();
        this.props.dispatch(addFormItem(val, index));
        this.props.dispatch(getNodeConfig(val, index));
    };

    importPage = async (e) => {
        try {
            const file = e.target.files[0];
            if(!(/json/.test(file.type))) {
                Modal.error({ title: '文件格式不正确，应为json格式' });
                return;
            }
            e.target.value = null;
            const json = await readJSON(file);
            const data = purify(json);
            
            if (data && data.length > 0) {
                this.props.dispatch(importForm(data));
            } else {
                Modal.error({ title: '文件内容不正确' });
            }
        } catch(err) {
            console.error(err);
        }
    };

    test = (e) => {
        if(this.props.nodes.length > 0) {
            e.preventDefault();
            Modal.error({ 
                title: '当前表单不为空，请在空表单上导入'
            });
        }
    };

    getValidate = (comp) => {
        return (func) => {
            comp.valiFunc = func;
        }
    };

    render() {
        const { nodes, isDraging } = this.props;
        return (
            <div className={`main-wrapper`} >
                <div className="func-row">
                    <label className="import" style={{ cursor: 'pointer' }}>
                        导入表单
                        <input 
                            type="file" 
                            style={{ display: 'none' }} 
                            onChange={this.importPage} 
                            onClick={this.test} 
                            ref={el => this.fileRef = el}
                        />
                    </label>
                </div>
                
                <form className={`wrapper ${isDraging ? 'mask' : ''}`} ref={el => this.wrpRef = el}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot)}
                                >
                                    {nodes.map((v, index) => (
                                        <Draggable key={v.index} draggableId={`item${v.index}`} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {v.component.comp(v.index, this.getValidate(v.component))}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </form>
            </div>
        )
    }
}

export default connect(state => ({
    nodes: state.nodes,
    isDraging: state.isDraging
}))(App);