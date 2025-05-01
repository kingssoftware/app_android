import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const calender_style = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: hp('25%'),
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    marginBottom: hp('1%'),
  },
  monthText: {
    fontSize: wp('5%'),
    color: '#000',
    fontWeight: 'bold',
    paddingHorizontal: wp('2%'),
  },
  daysWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  daysList: {
    flexGrow: 0,
    width: wp('80%'),
  },
  daysContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  dayContainer: {
    width: wp('11.4%'),
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledDayContainer: {
    opacity: 0.5,
  },
  dayNameText: {
    fontSize: wp('3%'),
    color: '#666',
    fontWeight: 'bold',
  },
  dayNumberContainer: {
    width: wp('8%'),
    height: wp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('4%'),
    marginTop: hp('1%'),
  },
  disabledDayNumberContainer: {
    backgroundColor: '#f0f0f0',
  },
  selectedDay: {
    backgroundColor: '#13801e',
  },
  markedDay: {
    borderWidth: 1,
    borderColor: '#13801e',
  },
  dayNumberText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  selectedDayText: {
    color: '#fff',
  },
  disabledText: {
    color: '#999',
  },
  arrow_mount: {
    fontSize: wp('7%'),
    color: 'black',
    textAlign: 'center',
  },
  arrow_day_container_display: {
    backgroundColor: '#13801e',
    width: wp('10%'),
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow_day: {
    fontSize: wp('7%'),
    color: 'whitesmoke',
    textAlign: 'center',
  },
});

export default calender_style;
