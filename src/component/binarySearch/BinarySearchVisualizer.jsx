import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BinarySearchVisualizer.css";

const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const BinarySearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");
  const [searchSteps, setSearchSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    generateArray(10); // Default array of size 10
  }, []);

  const generateArray = (size) => {
    const sortedArray = Array.from({ length: size }, (_, i) => ({
      value: i + 1,
      id: `id-${i}`,
      state: "default",
    }));
    setArray(sortedArray);
    setMessage("");
    setSearchSteps([]);
    setCurrentStep(0);
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSpeed(1100 - e.target.value);
  };

  const binarySearch = (array, target) => {
    let left = 0;
    let right = array.length - 1;
    const steps = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        array: JSON.parse(JSON.stringify(array)),
        mid,
        left,
        right,
      });

      if (array[mid].value === target) {
        array[mid].state = "found";
        steps.push({
          array: JSON.parse(JSON.stringify(array)),
          mid,
          left,
          right,
        });
        return steps;
      } else if (array[mid].value < target) {
        array[mid].state = "searching";
        left = mid + 1;
      } else {
        array[mid].state = "searching";
        right = mid - 1;
      }
    }

    return steps;
  };

  const startSearch = () => {
    if (isSearching) return;

    const numTarget = parseInt(target, 10);
    if (isNaN(numTarget) || numTarget < 1 || numTarget > array.length) {
      setMessage("Please enter a valid number within the range!");
      return;
    }

    setIsSearching(true);
    const steps = binarySearch(array, numTarget);
    setSearchSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      setTimeout(() => {
        setCurrentStep(i);
        if (i === steps.length - 1) {
          setIsSearching(false);
          setMessage(
            steps[i].array[steps[i].mid].state === "found"
              ? "Target found!"
              : "Target not found!"
          );
        }
      }, speed * i);
    }
  };

  return (
    <div className="binary-search-visualizer">
      <h1>Binary Search Visualizer</h1>
      <div className="controls">
        <label>
          Enter target number:
          <input
            type="number"
            value={target}
            onChange={handleTargetChange}
            min="1"
            max={array.length}
            disabled={isSearching}
          />
        </label>
        <button onClick={startSearch} disabled={isSearching}>
          Start Search
        </button>
        <button onClick={() => generateArray(10)} disabled={isSearching}>
          Reset
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed}
            onChange={handleSpeedChange}
            disabled={isSearching}
          />
        </label>
      </div>
      <div className="array-container">
        {array.map((element, index) => (
          <motion.div
            key={element.id}
            layout
            transition={springAnim}
            className={`array-element ${
              index === searchSteps[currentStep]?.mid
                ? "mid"
                : element.state === "found"
                ? "found"
                : element.state === "searching"
                ? "searching"
                : ""
            }`}
            style={{ height: `${element.value * 20}px` }}
          >
            {element.value}
          </motion.div>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default BinarySearchVisualizer;
