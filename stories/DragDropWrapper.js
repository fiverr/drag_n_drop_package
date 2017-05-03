import React from 'react';
import DragDrop from '../src/index';

class DragDropWrapper extends React.Component {
    constructor() {
        super();

        this.state = {
            list: [1, 2, 3, 4]
        };

        this.changeOrder = this.changeOrder.bind(this);
    }

    changeOrder({take, put}) {
        const newList = [...this.state.list],
            movedItem = newList.splice(take, 1);

        this.setState({
            list: [...newList.slice(0, put), movedItem, ...newList.slice(put, newList.length)]
        });
    }

    render() {
        return (
            <DragDrop onDrop={this.changeOrder}>
                {this.state.list.map((item, i) => (
                    <div className="drag-drop-target" style={styles.item} key={i}>{item}</div>
                ))}
            </DragDrop>
        );
    }
}

const styles = {
    item: {
        border: '1px solid black',
        margin: '20px',
        padding: '10px'
    }
};

export default DragDropWrapper;