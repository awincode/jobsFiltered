import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import bug from '../../../_libs/bug';


const FComp = styled.div`
    background: #8c0275;
    border: 1px solid ${props =>
            props.active ?
                '#fbcdf3' :
                'white'
    };
    padding: .33em .5em;
    margin: 0 .5em;
    text-align: center;

    background: ${props => (
        props.hovered ?
            '#630353' :
            props.active ?
                '#fbcdf3' :
                'transparent'
    )};
`;

const FCompButton = SoftButton.extend`
    color: ${props => (props.active ?
        props.hovered ?
            '#e0bdda' :
            '#96097f' :
        'white'
    )};
    font-size: 18px;
    padding: .25em;
    border-radius: 3px;
    white-space: nowrap;
`;

const FViewArea = styled.div`
    padding: 3px 0 0;
    min-height: 22px;
    display: flex;
`;

const FViewFilter = styled.div`
    color: white;
    font-size: 13px;
    margin: 0 3px;
    padding: 2px 4px;
    background: ${props => props.zone === 'excl' ?
        '#ab1a1a':
        '#730362'
    };

    text-decoration:  ${props => props.zone === 'excl' ?
        'line-through':
        'none'
    };

    white-space: nowrap;
`;


const dndStyle = {
    cursor: 'move'
};

const buildFilterViewAreas = ({ locForFilterType, getFilterZone, id, zones }) => {
    if (locForFilterType) {
        return zones.map ((zone) => {
            const zoneFilterOrder = getFilterZone (id, zone);

            return (
                <FViewArea key={zone + 'View'}>

                    {zoneFilterOrder.map ((elem) => (
                        <FViewFilter
                            key={elem + 'View'}
                            zone={zone}
                        >
                            {locForFilterType.get (String (elem))}
                        </FViewFilter>
                    ))}

                </FViewArea>
            );
        });
    }
};

const filterSource = {
    beginDrag(props) {
        props.setIsMoving(true);

        return {
            id: props.id,
            originalIndex: props.findFilter(props.id),
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            const { moveFilter, filterOrder } = props;
            moveFilter(filterOrder, droppedId, originalIndex);
        }
    }
};

const filterTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId, filterOrder, moveFilter } = props;

        if (draggedId !== overId) {
            const overIndex = props.findFilter(overId);
            moveFilter(filterOrder, draggedId, overIndex);
        }
    },
};


@DropTarget(ItemTypes.FILTER, filterTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.FILTER, filterSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class FilterElem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        moveFilter: PropTypes.func.isRequired,
        findFilter: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        hovered: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        setModalType: PropTypes.func.isRequired,

    };

    render() {
        const {
            connectDragSource,
            connectDropTarget,
            isDragging,
            id,
            active,
            hovered,
            text,
            setModalType,
            getFilterZone,
            locForFilterType,

        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return compose(connectDragSource, connectDropTarget)(
            <div>
                <FComp
                    style={{
                        ...dndStyle,
                        opacity
                    }}
                    active={active}
                    hovered={hovered}
                    onClick={() => { setModalType(id) }}
                >
                    <FCompButton
                        active={active}
                        hovered={hovered}
                    >
                        {text}
                    </FCompButton>

                    {buildFilterViewAreas ({ locForFilterType, getFilterZone, id, zones: ['sel', 'excl'] })}

                </FComp>
            </div>
        );

    }
}
