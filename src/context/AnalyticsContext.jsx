import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const { profile } = useAuth();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (clientId, startDate, endDate) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('analytics')
        .select('*')
        .order('date', { ascending: true });

      if (clientId) query = query.eq('client_id', clientId);
      if (startDate) query = query.gte('date', startDate);
      if (endDate) query = query.lte('date', endDate);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setAnalyticsData(data || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const manualSync = async (clientId, viewId) => {
    // In a real app, this would call the Supabase Edge Function
    // For now, we simulate the flow
    console.log(`Syncing analytics for client ${clientId} with View ID ${viewId}`);
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <AnalyticsContext.Provider value={{
      analyticsData,
      loading,
      error,
      fetchAnalytics,
      manualSync
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
