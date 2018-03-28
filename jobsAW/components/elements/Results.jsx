import React, { Component } from 'react';
import styled from 'styled-components';
import { getFilterIsMoving } from '../../reducers/filter';
import { getModalIsOpen } from '../../reducers/ui';

import bug from '../../../_libs/bug';

import RList from './RList';

const Wrapper = styled.div`
    background: aliceblue;
    flex: 1;

    display: flex;
    flex-direction: row;
    
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;

    margin-top: 179px;
    margin-bottom: 31px;
`;

const RDetails = styled.div`
    color: #9a528e;    
    font-size: 2em;
    padding: 2em 3em;

    background: #fdf4fc;
    border: 1px solid #710b60;

    position: fixed;
    top: 179px;
    right: 0;
    width: calc(100% - 430px);
    bottom: 31px;
`;

const getResultDetails = ({jobs, resultId}) => {
    const job = jobs.filter ((job, index) => job.id === resultId);

    return job[0] && job[0].text.intro;
};

export default class Results extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.modalIsOpen && !nextProps.filterIsMoving;
    }

    render() {
                                                                        // bug ('Results props', this.props)
        return (
            <div>
                <Wrapper>
                    <RList {...this.props} />
                </Wrapper>
                <RDetails>
                    {getResultDetails (this.props)}
                </RDetails>
            </div>
        );
    }
}
