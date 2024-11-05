import React, { useState } from "react";
import { motion } from "framer-motion";
import "./StackQueueVisualizer.css";

// Component for individual element visualization
const Element = ({ value, index, isTop, isFront }) => {
  return (
    <motion.div
      className={`element ${isTop ? "top" : ""} ${isFront ? "front" : ""}`}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {value}
    </motion.div>
  );
};

// Main component
const StackQueueVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Stack operations
  const pushToStack = () => {
    if (inputValue === "") return;
    setStack((prevStack) => [...prevStack, inputValue]);
    setInputValue("");
  };

  const popFromStack = () => {
    if (stack.length === 0) return;
    setStack((prevStack) => prevStack.slice(0, -1));
  };

  // Queue operations
  const enqueueToQueue = () => {
    if (inputValue === "") return;
    setQueue((prevQueue) => [...prevQueue, inputValue]);
    setInputValue("");
  };

  const dequeueFromQueue = () => {
    if (queue.length === 0) return;
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  return (
    <div className="stack-queue-visualizer">
      <h1>Stack and Queue Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={pushToStack}>Push to Stack</button>
        <button onClick={popFromStack}>Pop from Stack</button>
        <button onClick={enqueueToQueue}>Enqueue to Queue</button>
        <button onClick={dequeueFromQueue}>Dequeue from Queue</button>
      </div>
      <div className="visualizers">
        {/* Stack Visualizer */}
        <div className="visualizer">
          <h2>Stack (LIFO)</h2>
          <div className="container stack">
            {stack.map((value, index) => (
              <Element
                key={index}
                value={value}
                isTop={index === stack.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Queue Visualizer */}
        <div className="visualizer">
          <h2>Queue (FIFO)</h2>
          <div className="container queue">
            {queue.map((value, index) => (
              <Element key={index} value={value} isFront={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackQueueVisualizer;
