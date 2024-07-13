import React from 'react';

const Settings = ({ workMinutes, shortBreakMinutes, longBreakMinutes, onSettingsChange }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-2">
        <label className="flex flex-col">
          Work Duration:
          <input
            type="number"
            value={workMinutes}
            onChange={e => onSettingsChange('work', e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Short Break Duration:
          <input
            type="number"
            value={shortBreakMinutes}
            onChange={e => onSettingsChange('shortBreak', e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          Long Break Duration:
          <input
            type="number"
            value={longBreakMinutes}
            onChange={e => onSettingsChange('longBreak', e.target.value)}
            className="border rounded p-2"
          />
        </label>
      </div>
    </div>
  );
};

export default Settings;
