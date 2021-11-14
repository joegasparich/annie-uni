import React, { useEffect, useState } from "react";

import "./slider.css";

const EventListenerMode = {capture: true};

let offset = 0, width = 0;

const Slider = ({onChange}) => {
  const [value, setValue] = useState(0);

  const preventGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'none';
  }

  const restoreGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'auto';
  }

  const mousemoveListener = (e) => {
    e.stopPropagation ();
    // do whatever is needed while the user is moving the cursor around
    const value = Math.min(Math.max(e.clientX - offset, 0), width);
    onChange(value / width);
    setValue(value);
  }

  const mouseupListener = (e) => {
    restoreGlobalMouseEvents ();
    document.removeEventListener ('mouseup',   mouseupListener,   EventListenerMode);
    document.removeEventListener ('mousemove', mousemoveListener, EventListenerMode);
    e.stopPropagation ();
  }

  const captureMouseEvents = (e) => {
    preventGlobalMouseEvents ();
    document.addEventListener ('mouseup',   mouseupListener,   EventListenerMode);
    document.addEventListener ('mousemove', mousemoveListener, EventListenerMode);
    e.preventDefault ();
    e.stopPropagation ();
  }

  const handleMouseDown = (e) => {
    captureMouseEvents(e);
    e.preventDefault ();
    e.stopPropagation ();
    const slider = document.getElementById("slider");
    offset = slider.offsetLeft;
    width = slider.offsetWidth;
  }

  useEffect(() => {
    const handle = document.getElementById("handle");
    handle.addEventListener('mousedown', e => handleMouseDown(e));
  }, [])


    return (
        <div id="slider" className="slider">
            <div id="handle" className="handle-container" style={{transform: `translate(calc(${value}px - 50%), -50%)`}}>
              <div className="handle" />
            </div>
        </div>
    )
}

export default Slider;
