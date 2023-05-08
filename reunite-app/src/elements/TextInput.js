import styled from 'styled-components';

import {scaledValues} from '../common/utils';

const TextInput = styled.TextInput`
    ${(props) => props.flex && `flex: ${props.flex}`}
    border-radius: ${(props) => props.bdrRad || 0}px;
    padding: ${(props) => scaledValues(props.pd || [0])};
`;

export default TextInput;