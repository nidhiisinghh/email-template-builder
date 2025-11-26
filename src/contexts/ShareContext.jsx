import React, { createContext, useContext, useState, useEffect } from 'react';
import { shareAPI } from '../utils/api';

const ShareContext = createContext();

export const useShare = () => {
  const context = useContext(ShareContext);
  if (!context) {
    throw new Error('useShare must be used within a ShareProvider');
  }
  return context;
};

export const ShareProvider = ({ children }) => {
  const [pendingShares, setPendingShares] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingShares = async () => {
    try {
      const response = await shareAPI.getPendingShares();
      setPendingShares(response.data.pendingShares || []);
    } catch (error) {
      console.error('Failed to fetch pending shares:', error);
    } finally {
      setLoading(false);
    }
  };

  const respondToShare = async (templateId, action) => {
    // Optimistic update: immediately remove from local state
    setPendingShares(prev => prev.filter(share => share._id !== templateId));

    try {
      await shareAPI.respondToShare(templateId, action);
      // Wait a bit for the backend to process the change before refreshing
      // This prevents race conditions where we fetch too early and get the old list
      setTimeout(async () => {
        await fetchPendingShares();
      }, 500);
      return { success: true };
    } catch (error) {
      console.error(`Failed to ${action} share:`, error);
      // If it failed, we should probably re-fetch to get the correct state back
      fetchPendingShares();
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchPendingShares();
  }, []);

  return (
    <ShareContext.Provider value={{
      pendingShares,
      loading,
      fetchPendingShares,
      respondToShare
    }}>
      {children}
    </ShareContext.Provider>
  );
};