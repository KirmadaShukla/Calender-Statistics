import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BarGraphPopup from './BarGraphPopup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarData, setSelectedDate, clearSelectedDate, selectCalendarData, selectSelectedDate, selectSelectedDateData, selectLoading, selectHasDataForDate } from '../store/slices/calendarSlice';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const dispatch = useDispatch();
  const dummyData = useSelector(selectCalendarData);
  const selectedDate = useSelector(selectSelectedDate);
  const popupData = useSelector(selectSelectedDateData);
  const loading = useSelector(selectLoading);
  const showPopup = useSelector((state) => !!state.calendar.selectedDate);
  const hasDataForDate = (date) => selectHasDataForDate({ calendar: { data: dummyData } }, date);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchCalendarData());
  }, [dispatch]);

  // Create events for dates with data
  const events = Object.keys(dummyData).map(dateString => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return {
      title: 'Data Available',
      start: date,
      end: date,
      allDay: true
    };
  });

  // Custom event style for dates with data
  const eventPropGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: '#3174ad',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  // Handle date selection
  const handleSelectDate = (slotInfo) => {
    const date = slotInfo.start;
    if (hasDataForDate(date)) {
      dispatch(setSelectedDate(date));
    } else {
      alert("No data found for the selected date.");
    }
  };

  // Handle event selection (click on highlighted date)
  const handleSelectEvent = (event) => {
    const date = event.start;
    if (hasDataForDate(date)) {
      dispatch(setSelectedDate(date));
    } else {
      alert("No data found for the selected date.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendar Statistics Dashboard</h1>
      <div className="h-5/6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectSlot={handleSelectDate}
          onSelectEvent={handleSelectEvent}
          selectable
          eventPropGetter={eventPropGetter}
        />
      </div>
      
      {showPopup && (
        <BarGraphPopup 
          date={selectedDate} 
          data={popupData} 
          onClose={() => dispatch(clearSelectedDate())} 
        />
      )}
    </div>
  );
};

export default CalendarView;