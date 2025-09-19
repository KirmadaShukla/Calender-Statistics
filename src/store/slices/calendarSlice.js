import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch calendar data
export const fetchCalendarData = createAsyncThunk(
  'calendar/fetchData',
  async () => {
    const response = await fetch('/dummy.json');
    return response.json();
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    data: {},
    selectedDate: null,
    selectedDateData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      // Find data for the selected date
      const dateStr = formatDate(action.payload);
      state.selectedDateData = state.data[dateStr] || [];
    },
    clearSelectedDate: (state) => {
      state.selectedDate = null;
      state.selectedDateData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCalendarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Helper function to format date as DD-MM-YYYY
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const { setSelectedDate, clearSelectedDate } = calendarSlice.actions;

export const selectCalendarData = (state) => state.calendar.data;
export const selectSelectedDate = (state) => state.calendar.selectedDate;
export const selectSelectedDateData = (state) => state.calendar.selectedDateData;
export const selectLoading = (state) => state.calendar.loading;
export const selectError = (state) => state.calendar.error;
export const selectHasDataForDate = (state, date) => {
  const dateStr = formatDate(date);
  return !!state.calendar.data[dateStr];
};

export default calendarSlice.reducer;