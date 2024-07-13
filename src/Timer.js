import React, { useState, useEffect } from 'react';

const Timer = ({ minutes, seconds, isActive, onToggle, onReset, onTimeEnd }) => {
  const [time, setTime] = useState({ minutes, seconds });

  useEffect(() => {
    setTime({ minutes, seconds });
  }, [minutes, seconds]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const newSeconds = time.seconds - 1;
        const newMinutes = newSeconds < 0 ? time.minutes - 1 : time.minutes;
        if (newMinutes < 0) {
          clearInterval(interval);
          onTimeEnd();
        } else {
          setTime({
            minutes: newMinutes,
            seconds: newSeconds < 0 ? 59 : newSeconds
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time, onTimeEnd]);

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">
        {`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
      </h1>
      <div className="space-x-2">
        <button
          onClick={onToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
