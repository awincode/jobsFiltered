import React from 'react';
import '../../styles/rlist.css';
import styled from 'styled-components';

import bug from '../../../_libs/bug';

import RListItems from './RListItems';


export default  (props) => {
    const { loaded, jobs, resultId, setResultId } = props;

    const heading = 'Software Engineer';
    const numberOfJobs = jobs.length;
    
    const ListWrapper = styled.div`
        background: #e0e0e0;
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
    `;

    const RListHeader = styled.div`
        color: #363738;

        border-bottom: 1px solid grey;
        display: flex;

        width: 430px;
        position: fixed;
        background: white;
        margin-top: -1em;
        padding: 0 1.75em 0 3em;
    `;

    const HeaderHeading = styled.h3`
        font-size: 1.75em;
        margin: .75em 0;
        flex: 1;
    `;

    const HeaderJobNumers = styled.span`
        color: #8c858c;
        font-size: 1.75em;
        font-weight: bold;
        width: 60px;
        line-height: 2.75em;
        text-align: right;
    `;

    const Loading = styled.div`
        color: #775271;
        font-size: 2.5em;
        padding: 1.5em 2em;
        background: white;
        width: 100%;
    `;

    const RListItemsWrapper = styled.ul`
        display: flex;
        flex-direction: column;
    `;


    const LoadedList = ({jobs, setResultId, resultId}) => (
        <div>
            <RListHeader>
                <HeaderHeading>
                    {heading}
                </HeaderHeading>
                <HeaderJobNumers>
                    {numberOfJobs}
                </HeaderJobNumers>
            </RListHeader>   
            <RListItemsWrapper className='listElemW'>
                {jobs.map ((job) => (
                    <RListItems key={job.id}
                        job={job}
                        resultId={resultId}
                        onClickItem={() => setResultId (job.id)}
                    />
                ))}
            </RListItemsWrapper>
        </div>
    );
    
    return (
        loaded ? (
            <ListWrapper >
                <LoadedList {...props} />
            </ListWrapper >
            
        ) : 
        <Loading>Loading...</Loading>
    );

};