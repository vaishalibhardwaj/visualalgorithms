import React from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  speed: number;
  setSpeed: (speed: number) => void;
  size: number;
  setSize: (size: number) => void;
  onClose: () => void;
  disabled: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  speed,
  setSpeed,
  size,
  setSize,
  onClose,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Settings</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Animation Speed (ms)
          </label>
          <input
            type="range"
            min="1"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Fast</span>
            <span>{speed}ms</span>
            <span>Slow</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Array Size
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>10</span>
            <span>{size} elements</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};