import React from 'react';

const getEleIndex = (element) => [].indexOf.call(element.parentNode.children, element);

class DragAndDrop extends React.Component { // eslint-disable-line no-undef
    constructor() {
        super();

        this.state = {
            dragInProgress: false,
            take: null,
            put: null
        };

        this.clearOnDrop = this.clearOnDrop.bind(this);
    }

    componentDidMount() {
        const Dragula = require('react-dragula');
        this.initDragula(Dragula);
    }

    clearOnDrop() {
        document.body.classList.remove('dd-no-drop');

        this.setState({
            dragInProgress: false
        });
    }

    initDragula(Dragula) {
        const {
            onDrop,
            moves,
            accepts
        } = this.props;

        const containers = [this.dragulaDecorator],
            clearOnDrop = this.clearOnDrop.bind(this);

        const drake = Dragula(containers, { // eslint-disable-line new-cap
            moves: (item, container, target) => {
                // check if the element has drag and drop specific class - and only then enable drag
                if (typeof moves === 'function') {
                    return moves(target);
                } else {
                    return _.includes(target.className, 'drag-drop-target');
                }
            },
            accepts: (item, target, source, sibling) => {

                if (typeof accepts === 'function') {
                    return accepts(sibling);
                }

                return true;
            }
        });

        drake.on('drag', (ele) => {
            this.setState({
                take: getEleIndex(ele),
                dragInProgress: true
            });
        });

        drake.on('drop', (ele) => {
            this.setState({
                put: getEleIndex(ele)
            });

            // prevent plugin dom manipulation
            drake.cancel(true);

            // init customize onDrop - pass it the current state
            onDrop(this.state);

            clearOnDrop();
        });

        drake.on('dragend', clearOnDrop);

        drake.on('out', () => document.body.classList.add('dd-no-drop'));

        drake.on('over', clearOnDrop);
    }

    render() {
        return (
            <div ref={(ref) => this.dragulaDecorator = ref}>{this.props.children}</div>
        );
    }
}

export default DragAndDrop;
