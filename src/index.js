import React from 'react';
import Dragula from 'react-dragula';
import './drag-n-drop.scss';

class drag_n_drop extends React.Component {
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
        this.initDragula();
    }

    clearOnDrop() {
        const bodyClasses = document.body.getAttribute('class').replace(/dd-no-drop/g, '');

        document.body.setAttribute('class', bodyClasses.trim());

        this.setState({
            dragInProgress: false
        });
    }

    getEleIndex(element) {
        const elementSiblings = Array.prototype.slice.call(element.parentNode.children);

        return elementSiblings.indexOf(element); // work with sort_id
    }

    initDragula() {
        const {
            onDrop,
            moves,
            accepts
        } = this.props;

        const containers = [this.dragulaDecorator],
            clearOnDrop = this.clearOnDrop,
            getEleIndex = this.getEleIndex;

        const drake = Dragula(containers, {
            moves: (item, container, target) => {
                // check if the element has drag and drop specific class - and only then enable drag
                if (typeof moves === 'function') {
                    return moves(target);
                } else {
                    return (` ${target.className} `).indexOf(' drag-drop-target ') > -1;
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

        drake.on('dragend', () => {
            clearOnDrop();
        });

        drake.on('out', () => {
            let bodyClasses = document.body.getAttribute('class');

            bodyClasses += ' dd-no-drop';

            document.body.setAttribute('class', bodyClasses);
        });

        drake.on('over', () => {
            clearOnDrop();
        });
    }

    render() {
        return (
            <div ref={(ref) => this.dragulaDecorator = ref}>{this.props.children}</div>
        );
    }
}

export default drag_n_drop;