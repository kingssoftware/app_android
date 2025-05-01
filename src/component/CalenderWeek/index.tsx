import {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import calender_style from './css/calender_css';

const CalenderWeek = ({onDayPress, markedDates, selectedDate}: any) => {
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));

  // Função para calcular o início da semana (segunda-feira)
  function getWeekStart(date: any) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Ajusta para segunda-feira
    d.setDate(d.getDate() + diff);
    return d;
  }

  // Funções de navegação
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekEnd = new Date(newWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    if (weekEnd >= today) {
      setWeekStart(newWeekStart);
    }
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setWeekStart(newWeekStart);
  };

  const goToPreviousMonth = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setMonth(newWeekStart.getMonth() - 1);
    const adjustedWeekStart = getWeekStart(newWeekStart);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekEnd = new Date(adjustedWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    if (weekEnd >= today) {
      setWeekStart(adjustedWeekStart);
    }
  };

  const goToNextMonth = () => {
    const newWeekStart = new Date(weekStart);
    newWeekStart.setMonth(newWeekStart.getMonth() + 1);
    setWeekStart(getWeekStart(newWeekStart));
  };

  // Gera os 7 dias da semana
  const getWeekDays = () => {
    const days = [];
    const start = new Date(weekStart);
    const dayNames = ['MAN', 'TIR', 'ONS', 'TOR', 'FRE', 'LØR', 'SØN']; // Nomes dos dias em norueguês

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dateString = day.toISOString().split('T')[0];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPastDate = day < today;

      days.push({
        dateString,
        day: day.getDate(),
        dayName: dayNames[i],
        marked: markedDates[dateString]?.marked,
        disabled: isPastDate,
      });
    }
    return days;
  };

  const renderDay = ({item}: any) => (
    <TouchableOpacity
      style={[
        calender_style.dayContainer,
        item.disabled && calender_style.disabledDayContainer,
      ]}
      onPress={() =>
        !item.disabled && onDayPress({dateString: item.dateString})
      }
      disabled={item.disabled}>
      <Text
        style={[
          calender_style.dayNameText,
          item.disabled && calender_style.disabledText,
        ]}>
        {item.dayName}
      </Text>
      <View
        style={[
          calender_style.dayNumberContainer,
          item.dateString === selectedDate &&
            !item.disabled &&
            calender_style.selectedDay,
          item.marked && !item.disabled && calender_style.markedDay,
          item.disabled && calender_style.disabledDayNumberContainer,
        ]}>
        <Text
          style={[
            calender_style.dayNumberText,
            item.dateString === selectedDate &&
              !item.disabled &&
              calender_style.selectedDayText,
            item.disabled && calender_style.disabledText,
          ]}>
          {item.day}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={calender_style.calendarContainer}>
      {/* Cabeçalho com mês, ano e setas de navegação por mês */}
      <View style={calender_style.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={calender_style.arrow_mount}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={calender_style.monthText}>
          {weekStart.toLocaleString('no', {month: 'long', year: 'numeric'})}{' '}
          {/* Norueguês */}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={calender_style.arrow_mount}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Linha de dias com setas de navegação por semana */}
      <View style={calender_style.daysWrapper}>
        <TouchableOpacity
          onPress={goToPreviousWeek}
          style={calender_style.arrow_day_container_display}>
          <Text style={calender_style.arrow_day}>{'<'}</Text>
        </TouchableOpacity>

        <FlatList
          data={getWeekDays()}
          renderItem={renderDay}
          keyExtractor={item => item.dateString}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={calender_style.daysList}
          contentContainerStyle={calender_style.daysContentContainer}
        />

        <TouchableOpacity
          onPress={goToNextWeek}
          style={calender_style.arrow_day_container_display}>
          <Text style={calender_style.arrow_day}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalenderWeek;
