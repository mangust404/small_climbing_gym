import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';

export default function Lazy2gisMap(props) {
  const mapRef = useRef(null);
  const [mapState, setMapState] = useState({scrolled: false, mapObject: null});

  useEffect(() => {
    function elementInViewPort() {
      // getBoundingClientRect => returns the size of the given element and the position of it in relation to the view port
      const clientRect = mapRef.current.getBoundingClientRect();

      return (
        clientRect.top >= 0 &&
        clientRect.left >= 0 &&
        clientRect.bottom - 100 <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        clientRect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function checkViewPortCallback() {
      if (!mapState.mapObject && elementInViewPort()) {
        setMapState((prevState) => {
          return {...prevState, scrolled: true}
        });
      }
    }

    window.onscroll = window.addEventListener("scroll", checkViewPortCallback);

    return () => {
      window.removeEventListener("scroll", checkViewPortCallback);
    };
  }, [mapState.mapObject]);

  useEffect(() => {
    if (mapState.scrolled && !mapState.mapObject) {
      const dg = require('2gis-maps');
      const mapObject = dg.map(mapRef.current, {
        'center': props.center,
        'zoom': props.zoom
      });
      dg.marker(props.center).addTo(mapObject).bindPopup(props.balloon_text);

      setMapState(prevState => {
        return {...prevState, mapObject: mapObject};
      });
    }
    return () => {
      if (mapState.mapObject) {
        mapState.mapObject.remove();
      }
    }
  }, [mapState.scrolled, props.center, props.zoom, props.balloon_text, mapState.mapObject])

  return (
    <Box ref={mapRef} {...props}>
      <div>Loading map...</div>
    </Box>
  );
}