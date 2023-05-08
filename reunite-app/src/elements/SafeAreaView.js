import {SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

import {scaledValue} from '../common/utils';
import theme from '../common/theme';


const SafeAreaView = styled(RNSafeAreaView).attrs((props) => ({edges: props.edges || ['left', 'right']}))`
    ${(props) => props.flex && `flex: ${props.flex};`};
    border-top-left-radius: ${(props) => scaledValue(props.brdrRad?.[0] || props.brdrRad || 0)}px;
    border-top-right-radius: ${(props) => scaledValue(props.brdrRad?.[1] || props.brdrRad || 0)}px;
    border-bottom-left-radius: ${(props) => scaledValue(props.brdrRad?.[2] || props.brdrRad || 0)}px;
    border-bottom-right-radius: ${(props) => scaledValue(props.brdrRad?.[3] || props.brdrRad || 0)}px;
    ${(props) => props.position && `position: ${props.position};`};
    ${(props) => props.zIndex && `z-index: ${props.zIndex};`};
    ${(props) => props.left && `left: ${props.left};`};
    ${(props) => props.right && `right: ${props.right};`};
`;

export default SafeAreaView