import {StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  logoImage: {
    // height: 150,
    height: '150@s',
    // width: 150,
    width: '150@s',
    alignSelf: 'center',
    // marginTop: 50,
    marginTop: '50@s',
  },
  title: {
    // fontSize: 21,
    fontSize: '21@s',
    textAlign: 'center',
    // paddingTop: 20,
    paddingTop: '20@s',
    fontWeight: '500',
  },
  subTitle: {
    // fontSize: 17,
    fontSize: '17@s',
    textAlign: 'center',
    // paddingVertical: 20,
    paddingVertical: '20@s',
    fontWeight: '500',
  },
  from: {
    paddingTop: '20@s',
  },
  createSection: {
    flexDirection: 'row',
  },
  linkBtn: {
    paddingLeft: '17@s',
    color: colors.primary,
    fontSize: '16@s',
  },
  infoText: {
    fontSize: '17@s',
  },
});
