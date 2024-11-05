import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BinaryTreeVisualizer.css";

const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const createTree = () => {
  return {
    value: 1,
    left: {
      value: 2,
      left: {
        value: 4,
        left: null,
        right: null,
      },
      right: {
        value: 5,
        left: null,
        right: null,
      },
    },
    right: {
      value: 3,
      left: {
        value: 6,
        left: null,
        right: null,
      },
      right: {
        value: 7,
        left: null,
        right: null,
      },
    },
  };
};

const BinaryTreeVisualizer = () => {
  const [traversalType, setTraversalType] = useState("Inorder");
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTraversing, setIsTraversing] = useState(false);
  const [speed, setSpeed] = useState(500);

  const tree = createTree();

  useEffect(() => {
    if (isTraversing && currentStep < traversalOrder.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= traversalOrder.length) {
      setIsTraversing(false);
    }
  }, [currentStep, isTraversing, speed, traversalOrder]);

  const startTraversal = (type) => {
    if (isTraversing) return;
    setTraversalType(type);
    setCurrentStep(0);
    setIsTraversing(true);
    const order = [];
    switch (type) {
      case "Preorder":
        preorderTraversal(tree, order);
        break;
      case "Inorder":
        inorderTraversal(tree, order);
        break;
      case "Postorder":
        postorderTraversal(tree, order);
        break;
      default:
        break;
    }
    setTraversalOrder(order);
  };

  const preorderTraversal = (node, order) => {
    if (node) {
      order.push(node.value);
      preorderTraversal(node.left, order);
      preorderTraversal(node.right, order);
    }
  };

  const inorderTraversal = (node, order) => {
    if (node) {
      inorderTraversal(node.left, order);
      order.push(node.value);
      inorderTraversal(node.right, order);
    }
  };

  const postorderTraversal = (node, order) => {
    if (node) {
      postorderTraversal(node.left, order);
      postorderTraversal(node.right, order);
      order.push(node.value);
    }
  };

  return (
    <div className="binary-tree-visualizer">
      <h1>Binary Tree Traversal Visualizer</h1>
      <div className="controls">
        <button onClick={() => startTraversal("Preorder")} disabled={isTraversing}>
          Preorder
        </button>
        <button onClick={() => startTraversal("Inorder")} disabled={isTraversing}>
          Inorder
        </button>
        <button onClick={() => startTraversal("Postorder")} disabled={isTraversing}>
          Postorder
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
      <div className="tree-container">
        <TreeNode node={tree} traversalOrder={traversalOrder} currentStep={currentStep} />
      </div>
    </div>
  );
};

const TreeNode = ({ node, traversalOrder, currentStep }) => {
  if (!node) return null;

  const isActive = traversalOrder[currentStep] === node.value;
  return (
    <motion.div className="tree-node" transition={springAnim}>
      <div className={`node ${isActive ? "active" : ""}`}>{node.value}</div>
      <div className="children">
        <TreeNode node={node.left} traversalOrder={traversalOrder} currentStep={currentStep} />
        <TreeNode node={node.right} traversalOrder={traversalOrder} currentStep={currentStep} />
      </div>
    </motion.div>
  );
};

export default BinaryTreeVisualizer;
