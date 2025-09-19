import React, { useEffect, useState } from 'react';

// Function to fetch data from the JSON file
export const fetchData = async () => {
  try {
    const response = await fetch('/dummy.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
};

// Function to check if a date has data
export const hasDataForDate = (date, data) => {
  const dateString = formatDate(date);
  return !!data[dateString];
};

// Function to get data for a specific date
export const getDataForDate = (date, data) => {
  const dateString = formatDate(date);
  return data[dateString] || [];
};

// Helper function to format date as DD-MM-YYYY
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Function to get all dates with data
export const getDatesWithEvents = (data) => {
  return Object.keys(data).map(dateString => {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day);
  });
};