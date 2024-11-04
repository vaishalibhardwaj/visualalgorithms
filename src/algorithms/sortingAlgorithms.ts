type Animation = ['compare' | 'swap' | 'set', number, number, number?];

// Quick Sort
function quickSort(array: number[]): Animation[] {
  const animations: Animation[] = [];
  const auxiliaryArray = array.slice();
  
  function partition(low: number, high: number): number {
    const pivot = auxiliaryArray[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      animations.push(['compare', j, high, 0]);
      if (auxiliaryArray[j] < pivot) {
        i++;
        animations.push(['swap', i, j, 0]);
        [auxiliaryArray[i], auxiliaryArray[j]] = [auxiliaryArray[j], auxiliaryArray[i]];
      }
    }
    
    animations.push(['swap', i + 1, high, 0]);
    [auxiliaryArray[i + 1], auxiliaryArray[high]] = [auxiliaryArray[high], auxiliaryArray[i + 1]];
    return i + 1;
  }
  
  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }
  
  quickSortHelper(0, auxiliaryArray.length - 1);
  return animations;
}

// Merge Sort
function mergeSort(array: number[]): Animation[] {
  const animations: Animation[] = [];
  const auxiliaryArray = array.slice();
  
  function mergeSortHelper(start: number, end: number) {
    if (start === end) return;
    
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }
  
  function merge(start: number, mid: number, end: number) {
    const temp = [];
    let i = start;
    let j = mid + 1;
    
    while (i <= mid && j <= end) {
      animations.push(['compare', i, j, 0]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        temp.push(auxiliaryArray[i++]);
      } else {
        temp.push(auxiliaryArray[j++]);
      }
    }
    
    while (i <= mid) temp.push(auxiliaryArray[i++]);
    while (j <= end) temp.push(auxiliaryArray[j++]);
    
    for (let k = 0; k < temp.length; k++) {
      animations.push(['set', start + k, 0, temp[k]]);
      auxiliaryArray[start + k] = temp[k];
    }
  }
  
  mergeSortHelper(0, auxiliaryArray.length - 1);
  return animations;
}

// Heap Sort
function heapSort(array: number[]): Animation[] {
  const animations: Animation[] = [];
  const auxiliaryArray = array.slice();
  
  function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      animations.push(['compare', left, largest, 0]);
      if (auxiliaryArray[left] > auxiliaryArray[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      animations.push(['compare', right, largest, 0]);
      if (auxiliaryArray[right] > auxiliaryArray[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      animations.push(['swap', i, largest, 0]);
      [auxiliaryArray[i], auxiliaryArray[largest]] = [auxiliaryArray[largest], auxiliaryArray[i]];
      heapify(n, largest);
    }
  }
  
  for (let i = Math.floor(auxiliaryArray.length / 2) - 1; i >= 0; i--) {
    heapify(auxiliaryArray.length, i);
  }
  
  for (let i = auxiliaryArray.length - 1; i > 0; i--) {
    animations.push(['swap', 0, i, 0]);
    [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
    heapify(i, 0);
  }
  
  return animations;
}

// Bubble Sort
function bubbleSort(array: number[]): Animation[] {
  const animations: Animation[] = [];
  const auxiliaryArray = array.slice();
  
  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
      animations.push(['compare', j, j + 1, 0]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push(['swap', j, j + 1, 0]);
        [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
      }
    }
  }
  
  return animations;
}

export const algorithms: Record<string, (array: number[]) => Animation[]> = {
  quickSort,
  mergeSort,
  heapSort,
  bubbleSort,
};