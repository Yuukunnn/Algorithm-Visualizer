import React, { useState, useEffect } from "react";
import BubbleSort from "../bubbleSort/BubbleSort";
import InsertSort from "../insertSort/InsertSort";
import SelectionSort from "../selectionSort/SelectionSort";
import QuickSort from "../quickSort/QuickSort";
import MergeSort from "../mergeSort/MergeSort";
import "./sortContainer.css";

const SortContainer = () => {
  const components = ['BubbleSort', 'InsertSort', 'SelectionSort', 'QuickSort', 'MergeSort'];
  const [activeComponent, setActiveComponent] = useState(components[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveComponent(prevComponent => {
        const currentIndex = components.indexOf(prevComponent);
        const nextIndex = (currentIndex + 1) % components.length;
        return components[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'InsertSort':
        return <InsertSort />;
      case 'SelectionSort':
        return <SelectionSort />;
      case 'QuickSort':
        return <QuickSort />;
      case 'MergeSort':
        return <MergeSort />;
      default:
        return <BubbleSort />;
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="button-group">
          {components.map(component => (
            <button 
              key={component} 
              className={activeComponent === component ? 'active' : 'inactive'} 
              onClick={() => setActiveComponent(component)}
            >
              {component.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className="video-display">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default SortContainer;
