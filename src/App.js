import React, { useState } from 'react';
import Timer from './Timer';
import Settings from './Settings';
import './App.css';

const App = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [cycle, setCycle] = useState(1);
  const [resetFlag, setResetFlag] = useState(false); // Added reset flag

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setCycle(1);
    setResetFlag(prev => !prev); // Toggle the reset flag to trigger reset
  };

  const handleSettingsChange = (type, value) => {
    const newValue = parseInt(value, 10);
    if (type === 'work') setWorkMinutes(newValue);
    if (type === 'shortBreak') setShortBreakMinutes(newValue);
    if (type === 'longBreak') setLongBreakMinutes(newValue);
  };

  const handleTimeEnd = () => {
    if (isWorkTime) {
      if (cycle % 4 === 0) {
        setIsWorkTime(false);
        setCycle(1);
      } else {
        setIsWorkTime(false);
        setCycle(cycle + 1);
      }
    } else {
      setIsWorkTime(true);
    }
  };

  const currentMinutes = isWorkTime ? workMinutes : (cycle % 4 === 0 ? longBreakMinutes : shortBreakMinutes);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Settings
        workMinutes={workMinutes}
        shortBreakMinutes={shortBreakMinutes}
        longBreakMinutes={longBreakMinutes}
        onSettingsChange={handleSettingsChange}
      />
      <Timer
        key={resetFlag} // Force re-render when resetFlag changes
        minutes={currentMinutes}
        seconds={0}
        isActive={isActive}
        onToggle={handleToggle}
        onReset={handleReset}
        onTimeEnd={handleTimeEnd}
      />
    </div>
  );
};

export default App;
