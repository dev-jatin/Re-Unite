import React from 'react';
import PropTypes from 'prop-types';

import View from '../../elements';
import Text from '../../elements';
import {Avtar} from '../../components';

const Header = ({userData}) => {
  return (
    <View fd="row" ai="center" pd={[5, 16]}>
      <Avtar source={userData?.Avtar} />
      <Text fw="700" size="lg" mg={[0, 16]}>
        {userData?.name}
      </Text>
    </View>
  );
};

Header.propTypes = {
  userData: PropTypes.object,
};

export default Header;
