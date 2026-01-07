import { useEffect, useCallback } from 'react';

interface VisitorData {
  path: string;
  referrer?: string;
}

export const useVisitorTracking = () => {
  const trackPageView = useCallback(async () => {
    try {
      const visitorData: VisitorData = {
        path: window.location.pathname,
        referrer: document.referrer,
      };

      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });

      if (!response.ok) {
        throw new Error('Failed to track visitor');
      }

      const data = await response.json();
      return data;
    } catch (error) { console.log(error) }
  }, []);

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return { trackPageView };
};