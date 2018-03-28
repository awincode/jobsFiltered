import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FMSECompButton = SoftButton.extend`
    background: snow;
    box-shadow: 0 0 0 0.5px #424e3d;
    margin: .5em;
    padding: 0em 1em;
    text-align: left;
    line-height: 36px;

    &:hover {
        background: #d9e4e4;
    }

`;

const ButtonText = styled.span`
    height: 36px;
`;

const ButtonClose = styled.div`
    color: #9dd0c6;
    width: 36px;
    height: 36px;
    margin-right: -1em;
    background: transparent;
    text-align: center;
    float: right;

    color: #9dd0c6;
    &:after {
        content: '\00D7';
        font-size: 2em;
    }

    &:hover {
        color: #f35d5d;
        cursor: pointer;
    }
`;



const dndStyle = {
    cursor: 'move'
};

const filterSource = {
    beginDrag (props) {
        props.setIsMovingFromZone (props.zoneType);

        return {
            id: props.id,
            originalIndex: props.findFilter (props.id),
        };
    },

    endDrag (props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem ();
        const didDrop = monitor.didDrop ();

        if (!didDrop) {
            props.moveFilter (props.zoneFilterOrder, droppedId, originalIndex, []);
        }
    }
};

const filterTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { 
                findFilter, 
                zoneType, 
                movedFromZone: currentZoneType,
                zoneFilterOrder,
                moveFilter,
            } = props;

            const overIndex = findFilter (overId);
            
            const newZoneType = currentZoneType !== zoneType ?
                [currentZoneType, zoneType] :
                [currentZoneType];

            moveFilter (zoneFilterOrder, draggedId, overIndex, newZoneType);
        }
    },
};



@DropTarget(ItemTypes.FILTERZ, filterTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.FILTERZ, filterSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class FilterZoneElem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,  // number or string
        text: PropTypes.string.isRequired,
        moveFilter: PropTypes.func.isRequired,
        findFilter: PropTypes.func.isRequired,

    };

    render() {
        const {
            text,
            id,
            isDragging,
            connectDragSource,
            connectDropTarget,

        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return compose (connectDragSource, connectDropTarget)(
            <div>
                <FMSECompButton
                    style={{
                        ...dndStyle,
                        opacity
                    }}
                >
                    <ButtonText>{text}</ButtonText>
                    
                </FMSECompButton>
            </div>
        );

    }
}
