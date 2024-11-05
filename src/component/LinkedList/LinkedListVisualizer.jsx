import React, { useState } from "react";
import { motion } from "framer-motion";
import "./LinkedListVisualizer.css";

// Node component for visualization
const ListNode = ({ node, isHead, isTail, isCurrent }) => {
  return (
    <motion.div
      className={`node ${isHead ? "head" : ""} ${isTail ? "tail" : ""} ${
        isCurrent ? "current" : ""
      }`}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="node-value">{node.value}</span>
      {!isTail && <span className="node-next">→</span>}
    </motion.div>
  );
};

// Main component
const LinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [current, setCurrent] = useState(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [speed, setSpeed] = useState(500);

  // Helper function to create a new node
  const createNode = (value) => {
    return { value, next: null };
  };

  // Function to add a node to the head
  const addNodeToHead = () => {
    if (!inputValue) return;
    const newNode = createNode(inputValue);
    setList([newNode, ...list]);
    setInputValue("");
  };

  // Function to add a node to the tail
  const addNodeToTail = () => {
    if (!inputValue) return;
    const newNode = createNode(inputValue);
    setList([...list, newNode]);
    setInputValue("");
  };

  // Function to remove a node from the head
  const removeNodeFromHead = () => {
    if (list.length === 0) return;
    setList(list.slice(1));
  };

  // Function to remove a node from the tail
  const removeNodeFromTail = () => {
    if (list.length === 0) return;
    setList(list.slice(0, -1));
  };

  // Function to traverse the linked list
  const traverseList = () => {
    if (isTraversing || list.length === 0) return;
    setIsTraversing(true);
    let index = 0;

    const interval = setInterval(() => {
      setCurrent(list[index]);
      index++;

      if (index >= list.length) {
        clearInterval(interval);
        setCurrent(null);
        setIsTraversing(false);
      }
    }, speed);
  };

  return (
    <div className="linked-list-visualizer">
      <h1>Linked List Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter node value"
        />
        <button onClick={addNodeToHead} disabled={isTraversing}>
          Add to Head
        </button>
        <button onClick={addNodeToTail} disabled={isTraversing}>
          Add to Tail
        </button>
        <button onClick={removeNodeFromHead} disabled={isTraversing}>
          Remove Head
        </button>
        <button onClick={removeNodeFromTail} disabled={isTraversing}>
          Remove Tail
        </button>
        <button onClick={traverseList} disabled={isTraversing}>
          Traverse List
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed}
            onChange={(e) => setSpeed(1100 - e.target.value)}
            disabled={isTraversing}
          />
        </label>
      </div>
      <div className="list-container">
        {list.map((node, index) => (
          <ListNode
            key={index}
            node={node}
            isHead={index === 0}
            isTail={index === list.length - 1}
            isCurrent={node === current}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
