import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  loaderSection: {
    flexDirection: 'row',
  },
  wrapper: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginVertical: 13,
    // alignItems:'center',
    justifyContent: 'space-evenly',
  },
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});
