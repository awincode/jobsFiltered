import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemTypes from '../../constants/itemTypes';
import { DropTarget } from 'react-dnd';

import { findElem, moveElem } from '../../../_libs/dnd';

import styled from 'styled-components';
import { SoftButton } from '../../styles/components';

import StateComponent from '../facc/StateComponent'
import FElem from './FElem';
import FModal from '../../containers/filterModal';
import { getLocForFilterType } from '../../reducers/filter';


import bug from '../../../_libs/bug';


const Wrapper = styled.div`
    font-size: 1.5em;
    color: gray;
    padding: .75em 4em;
    width: 100%;
    min-height: 121px;
    position: fixed;
    margin-top: 58.5px;
    background: #96097f;

    display: flex;

`;

const Header = styled.div`
    color: white;
    font-size: 1.5em;
    font-weight: 300;
    height: 1.25em;
    margin-right: 1.25em;
    line-height: 2.75em;
`;

const Loading = styled.span`
    color: white;
    font-size: 1.75em;
    line-height: 1.2em;
    position: absolute;
    left: 6em;
`;

const FilterElems = (props) => {
    if (props.locFilter) {
        return props.filterOrder.map((elem) => {

            return (
                <StateComponent key={elem}
                    active={false}
                >
                    {(elemState) => {
                        return (
                            <FElem 
                                key={elem}
                                id={elem}
                                active={props.modalType === elem}
                                hovered={elemState.hovered}
                                text={props.locFilter.get (elem)}
                                locForFilterType={getLocForFilterType (props.loc, elem)}
                                {...props}
                            />
                        );
                    }}
                </StateComponent>
            );
        });
    }

    return <Loading>Loading...</Loading>;
};


const filterTarget = {
    drop (props, monitor, component) {
        props.setIsMoving (false);
    }    
};



@DropTarget(ItemTypes.FILTER, filterTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Filters extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        filterOrder: PropTypes.object.isRequired,
        loc: PropTypes.object.isRequired,
        updateFilter: PropTypes.func.isRequired,
        setIsMoving: PropTypes.func.isRequired,
        modalIsOpen: PropTypes.bool.isRequired,
        modalType: PropTypes.string.isRequired,
        setModalType: PropTypes.func.isRequired,
    }

    render() {
        const { 
            connectDropTarget, 
            filterOrder, 
            loc, 
            updateFilter, 
            setIsMoving, 
            modalIsOpen,
            modalType,
            setModalType 
        } = this.props;

        return connectDropTarget (
            <div>
                <Wrapper>
                    <Header>
                        Filter
                    </Header>

                    {FilterElems ({
                        locFilter: loc.filter,
                        moveFilter: moveElem (updateFilter, {setIsMoving}),
                        findFilter: findElem (filterOrder),
                        ...this.props
                    })}

                </Wrapper>

                <FModal/>

            </div>
        );
    }
}
