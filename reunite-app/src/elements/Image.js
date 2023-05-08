import React from 'react';

import styled from 'styled-components';

import {scaledValue} from '../common/utils';

const View = styled.Image`
  ${props => props.flex && `flex: ${props.flex}`}
  ${props =>
    props.height &&
    `height: ${
      typeof props.height === 'string'
        ? props.height
        : scaledValue(props.height) + 'px'
    }`};
  ${props =>
    props.width &&
    `width: ${
      typeof props.width === 'string'
        ? props.width
        : scaledValue(props.width) + 'px'
    }`};
  ${props => props.resizeMode && `resize-mode: ${props.resizeMode || 'cover'}`}
`;

export default View;
