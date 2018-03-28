import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 1em;
    color: #710b60;
    background: white;
    padding: .5em 2.5em;

    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #710b60;    
`;

const Copy = styled.span`
    font-size: .75em;
    color: grey;
    margin-left: 1.5em;
`;

export default () => (
    <Wrapper>
        JobsFiltered 
        <Copy>
            &copy; 2018 Alexander Werner, &nbsp;React Showcase
        </Copy>
    </Wrapper>
);