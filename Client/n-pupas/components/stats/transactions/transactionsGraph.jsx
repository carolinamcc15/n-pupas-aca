import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCookie } from 'cookies-next';

import { statsRadioButtons, statsTabs, statsTimeOptions } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';
import LineChart from 'components/charts/LineChart';
import useBranchContext from 'context/BranchContext';
import { tokenCookie } from 'constants/data';
import Tab from './StatsTabs';
import toast from 'react-hot-toast';

const api = new PupuseriaApi();

export const TransactionsGraph = () => {
  const { branchID } = useBranchContext();

  const [activeTab, setActiveTab] = useState(0);
  const [activeOption, setActiveOption] = useState(statsRadioButtons[0]);
  const [chartData, setChartData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startRangeDate, endRangeDate] = dateRange;

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const getChartData = async (tab, option) => {
    const token = getCookie(tokenCookie);
    // Sales
    if (tab === 0) {
      if (option === statsTimeOptions.today) {
        return api.getTodaySalesStats(branchID, token);
      } else if (option === statsTimeOptions.day && selectedDate) {
        return api.getDailySalesStats(branchID, token, selectedDate);
      } else if (option === statsTimeOptions.range && startRangeDate && endRangeDate) {
        return api.getRangeSalesStats(branchID, token, startRangeDate, endRangeDate);
      }
      // Purchases
    } else if (tab === 1) {
      if (option === statsTimeOptions.today) {
        return api.getTodayPurchasesStats(branchID, token);
      } else if (option === statsTimeOptions.day && selectedDate) {
        return api.getDailyPurchasesStats(branchID, token, selectedDate);
      } else if (option === statsTimeOptions.range && startRangeDate && endRangeDate) {
        return api.getRangePurchasesStats(branchID, token, startRangeDate, endRangeDate);
      }
    }

    return [];
  };

  const fetchData = async (tab, option) => {
    try {
      const data = await getChartData(tab, option);
      setChartData(data);
    } catch (e) {
      toast.error('Ocurrió un error al obtener algunos datos');
    }
  };

  const handleTabClick = index => {
    setActiveTab(index);
  };

  const handleOptionChange = event => {
    setActiveOption(event.target.value);
  };

  useEffect(() => {
    fetchData(activeTab, activeOption);
  }, [activeTab, activeOption, selectedDate, startRangeDate, endRangeDate]);

  return (
    <div>
      <Tab
        tabContent={statsTabs}
        handleTabClick={handleTabClick}
        selectedOption={activeOption}
        handleOptionChange={handleOptionChange}
        activeTab={activeTab}
      />
      <div className='flex w-full justify-center p-4 m-auto'>
        {activeOption === statsTimeOptions.day && (
          <div className='m-auto'>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat='dd/MM/yyyy'
              placeholderText='Seleccione una fecha'
              className='border-2 text-gray-700 p-1'
            />
          </div>
        )}
        {activeOption === statsTimeOptions.range && (
          <div className='m-auto'>
            {' '}
            <DatePicker
              selectsRange={true}
              startDate={startRangeDate}
              endDate={endRangeDate}
              placeholderText='Seleccione rango de fechas'
              onChange={update => {
                setDateRange(update);
              }}
              required={[true, true]}
              isClearable={false}
              className='border-2 text-gray-700 m-auto p-1'
            />
          </div>
        )}
      </div>
      <div className='w-full md:w-3/5 m-auto'>
        {chartData.length > 0 ? (
          <LineChart data={chartData} />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-gray-500 text-center  font-light p-10'>No hay datos para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
};
