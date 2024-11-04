import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { algorithms } from '../algorithms/sortingAlgorithms';
import { SettingsPanel } from './SettingsPanel';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('quickSort');
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  
  // Use refs to maintain state during async operations
  const sortingRef = useRef(false);
  const arrayRef = useRef<number[]>([]);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 400) + 10
    );
    setArray(newArray);
    arrayRef.current = newArray;
    setCompleted(false);
  }, [size]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const visualizeSort = async () => {
    setSorting(true);
    sortingRef.current = true;
    setCompleted(false);
    
    const animations = algorithms[selectedAlgorithm](arrayRef.current.slice());
    
    for (const animation of animations) {
      if (!sortingRef.current) break;
      
      const [type, i, j, newValue] = animation;
      
      if (type === 'compare') {
        // Skip comparison visualization for smoother animation
        continue;
      } else if (type === 'swap') {
        await sleep(speed);
        setArray(prev => {
          const newArray = [...prev];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          arrayRef.current = newArray;
          return newArray;
        });
      } else if (type === 'set') {
        await sleep(speed);
        setArray(prev => {
          const newArray = [...prev];
          if (typeof newValue === 'number') {
            newArray[i] = newValue;
            arrayRef.current = newArray;
          }
          return newArray;
        });
      }
    }
    
    setCompleted(true);
    setSorting(false);
    sortingRef.current = false;
  };

  const stopSorting = () => {
    setSorting(false);
    sortingRef.current = false;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={sorting ? stopSorting : visualizeSort}
            disabled={completed}
            className="btn btn-primary flex items-center gap-2"
          >
            {sorting ? <Pause size={20} /> : <Play size={20} />}
            {sorting ? 'Stop' : 'Start'} Sorting
          </button>
          
          <button
            onClick={generateArray}
            disabled={sorting}
            className="btn btn-secondary flex items-center gap-2"
          >
            <RotateCcw size={20} />
            New Array
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Settings size={20} />
            Settings
          </button>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={sorting}
            className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
          </select>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          speed={speed}
          setSpeed={setSpeed}
          size={size}
          setSize={setSize}
          onClose={() => setShowSettings(false)}
          disabled={sorting}
        />
      )}

      <div className="h-[400px] bg-white rounded-lg shadow-sm p-4 flex items-end justify-center gap-1">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${value}px`,
              width: `${Math.max(2, Math.floor(800 / size))}px`,
            }}
            className={`transform transition-all duration-[50ms] ${
              completed
                ? 'bg-green-500'
                : sorting
                ? 'bg-indigo-500'
                : 'bg-indigo-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};