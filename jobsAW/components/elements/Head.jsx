import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 2em;
    color: #710b60;
    font-style: italic;
    background: white;
    border-bottom: 1px solid #710b60;
    padding: .45em 1.75em;
    position: fixed;
    width: 100%;
`;

const Logo = styled.div`
    width: 5em;
    height: 1.25em;
    margin-right: 2em;
    background: grey;
    float: left;
`;


export default () => (
    <Wrapper>
        {/* <Logo /> */}
        JobsFiltered
    </Wrapper>
);