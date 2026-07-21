import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initMetaPixel,
  trackPageView,
} from '../services/metaPixel';

function MetaPixelTracker() {
  const location = useLocation();
  const previousLocation = useRef(null);

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    const currentLocation = `${location.pathname}${location.search}`;

    if (previousLocation.current === currentLocation) {
      return;
    }

    initMetaPixel();
    trackPageView();

    previousLocation.current = currentLocation;
  }, [location.pathname, location.search]);

  return null;
}

export default MetaPixelTracker;