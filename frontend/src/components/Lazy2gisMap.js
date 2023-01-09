import React, {  useRef } from 'react';
import { Box } from '@mui/material';
import { useOnScrollToElement } from '../helpers/useOnScrollToElement';

export default function Lazy2gisMap(props) {
  const mapRef = useRef(null);
  let mapObject = null;

  const createMap = () => {
    const dg = require('2gis-maps');
    mapObject = dg.map(mapRef.current, {
      'center': props.center,
      'zoom': props.zoom
    });
    dg.marker(props.center).addTo(mapObject).bindPopup(props.balloon_text);
  }

  const removeMap = () => {
    if (mapObject) mapObject.remove();
  }

  useOnScrollToElement(mapRef, createMap, removeMap);

  return (
    <Box ref={mapRef} {...props}>
      <div>Loading map...</div>
    </Box>
  );
}