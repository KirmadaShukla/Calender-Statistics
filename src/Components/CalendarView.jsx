import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BarGraphPopup from './BarGraphPopup';
import { fetchData, hasDataForDate, getDataForDate, getDatesWithEvents } from './DataProvider';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [events, setEvents] = useState([]);
  const [dummyData, setDummyData] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setDummyData(data);
      
      // Create events for dates with data
      const eventData = getDatesWithEvents(data).map(date => ({
        title: 'Data Available',
        start: date,
        end: date,
        allDay: true
      }));
      
      setEvents(eventData);
    };
    
    loadData();
  }, []);

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
    if (hasDataForDate(date, dummyData)) {
      setSelectedDate(date);
      setPopupData(getDataForDate(date, dummyData));
      setShowPopup(true);
    } else {
      alert("No data found for the selected date.");
    }
  };

  // Handle event selection (click on highlighted date)
  const handleSelectEvent = (event) => {
    const date = event.start;
    if (hasDataForDate(date, dummyData)) {
      setSelectedDate(date);
      setPopupData(getDataForDate(date, dummyData));
      setShowPopup(true);
    } else {
      alert("No data found for the selected date.");
    }
  };

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
          onClose={() => setShowPopup(false)} 
        />
      )}
    </div>
  );
};

export default CalendarView;