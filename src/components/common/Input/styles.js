import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
  },
  wrapper: {
    height: 42,
    // borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 4,
    // flexDirection: 'row',
    paddingHorizontal: 5,
    // alignItems: 'center',
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});
