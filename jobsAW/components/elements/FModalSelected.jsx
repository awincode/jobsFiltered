import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { findElem } from '../../../_libs/dnd';

import StateComponent from '../facc/StateComponent'

import FMSElem from './FMSElem';
import styled from 'styled-components';
import { SoftButton } from '../../styles/components';


import bug from '../../../_libs/bug';

const Section = styled.div`
    background: #e1e8d6; 
    width: 100%;
    border-bottom: 1px solid gray;

    display: flex;
    flex-direction: column;
`;

const SectionHeader = styled.div`
    height: 2.75em;
    background: #f2f5ef;
    display: flex;

    > div {
        font-size: 1.25em;
        line-height: 2.2em;
    }
`;

const SectionTitle = styled.div`
    color: #5d6d4c;
    padding: 0 2em 0 3.5em;
`;

const SectionCtrls = styled.div`
    display: flex;
`;

const SectionBody = styled.div`
    min-height: 4.5em;
    padding: .5em 1em;
    display: flex;
`;

const OnlyTopButton = SoftButton.extend`
    width: 10em;
    padding: .35em 0.75em;
    border: 1px solid transparent;
    background: ${props => (props.topOnly ? '#f5dff1' : 'transparent')};
    border-color: ${props => 
        (props.hovered ? 
            'grey' : 
            'transparent'
        )
    };
    box-shadow: ${props => (props.hovered ? '0 0 4px 0px #827b81' : 'none')};
`;


const SecElems = (props) => {
    const { locForModalType, zoneFilterOrder } = props;

    if (locForModalType) {
        return zoneFilterOrder.map ((elem) => {
            return (
                <FMSElem 
                    key={elem}
                    id={elem}
                    text={locForModalType.get (String (elem))}
                    {...props}
                />
            );
        });
    }

    return <span>Loading...</span>;
};

const filterTarget = {
    hover(props, monitor, component) {
        const { id } = monitor.getItem ();
        const { 
            getFilterZone,
            updateFilter,
            modalType,
            zoneType,
            setIsMovingFromZone,
            movedFromZone: currentZoneType,
        } = props;


        if (currentZoneType !== zoneType) {
            const fromZone = getFilterZone (modalType, currentZoneType);
            const toZone = getFilterZone (modalType, zoneType);
            const overIndex = toZone.size;

            props.moveFilter (fromZone, id, overIndex, [currentZoneType, zoneType]);
        }
                                                                                                        
    },

    drop(props, monitor, component) {
        props.setIsMovingFromZone (null);
    }
};


const topOnlyButton = ({topOnly, topOnlyOnClick, topOnlyLoc}) => (
    <StateComponent active={topOnly}>
        {(elemState) => {
            const onOff = elemState.hovered !== elemState.active;
            const text = topOnlyLoc.get (onOff ? 1 : 0);

            return (
                <OnlyTopButton
                    topOnly={onOff}
                    hovered={elemState.hovered}
                    onClick={topOnlyOnClick} 
                >
                    {text}
                </OnlyTopButton>
            );
        }}
    </StateComponent>
);


@DropTarget(ItemTypes.FILTERZ, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class FModalSelected extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        loc: PropTypes.object.isRequired,
        modalType: PropTypes.string.isRequired,
        zoneType: PropTypes.string.isRequired,
        getFilterZone: PropTypes.func.isRequired,
        moveFilter: PropTypes.func.isRequired,
        
        updateFilter: PropTypes.func.isRequired,
        setIsMovingFromZone: PropTypes.func.isRequired,
        toggleTopOnly: PropTypes.func.isRequired,
        topOnly: PropTypes.bool,
    }

    render() {

        const {
            connectDropTarget,
            loc,
            modalType,
            zoneType,
            getFilterZone,
            moveFilter,
            updateFilter,
            setIsMovingFromZone,
            toggleTopOnly,
            topOnly,

        } = this.props;

        const zoneTitle = loc.filter.getIn (['zone', zoneType, 'title']);  
        const zoneFilterOrder = getFilterZone (modalType, zoneType);

        return connectDropTarget (
            <div>
                <Section>
                    <SectionHeader>
                        <SectionTitle>
                            {zoneTitle}
                        </SectionTitle>

                        <SectionCtrls>
                            {topOnly !== undefined ? 
                                topOnlyButton ({
                                    topOnly, 
                                    topOnlyOnClick: () => toggleTopOnly (modalType), 
                                    topOnlyLoc: loc.filter.get ('topOnly')
                                }) : 
                                null
                            }
                        </SectionCtrls>
                    </SectionHeader>

                    <SectionBody>
                        {SecElems({
                            zoneFilterOrder,
                            findFilter: findElem (zoneFilterOrder),
                            ...this.props
                        })}
                    </SectionBody>

                </Section>
            </div>
        );
    }
}