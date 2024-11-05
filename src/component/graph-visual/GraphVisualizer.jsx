import React, { useState } from "react";
import { motion } from "framer-motion";
import "./GraphVisualizer.css";

// Graph node component
const GraphNode = ({ node, isVisited }) => {
  return (
    <motion.div
      className={`graph-node ${isVisited ? "visited" : ""}`}
      style={{ top: `${node.y}px`, left: `${node.x}px` }}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {node.label}
    </motion.div>
  );
};

// Graph edge component
const GraphEdge = ({ edge }) => {
  const { x1, y1, x2, y2 } = edge;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="2"
      className="graph-edge"
    />
  );
};

// Main component
const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
  const [selectedNode, setSelectedNode] = useState("");
  const [isTraversing, setIsTraversing] = useState(false);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [traversalType, setTraversalType] = useState("DFS");

  // Add a new node
  const addNode = () => {
    if (!nodeLabel) return;
    const newNode = {
      id: nodes.length,
      label: nodeLabel,
      x: Math.random() * 400 + 50,
      y: Math.random() * 400 + 50,
    };
    setNodes([...nodes, newNode]);
    setNodeLabel("");
  };

  // Add a new edge
  const addEdge = () => {
    if (!selectedNode) return;
    const [startLabel, endLabel] = selectedNode.split(",");
    const startNode = nodes.find((node) => node.label === startLabel);
    const endNode = nodes.find((node) => node.label === endLabel);
    if (startNode && endNode) {
      const newEdge = {
        x1: startNode.x + 20,
        y1: startNode.y + 20,
        x2: endNode.x + 20,
        y2: endNode.y + 20,
      };
      setEdges([...edges, newEdge]);
    }
    setSelectedNode("");
  };

  // Depth-First Search (DFS)
  const dfs = (startNode, visited = new Set(), order = []) => {
    if (!startNode || visited.has(startNode)) return;
    visited.add(startNode);
    order.push(startNode.label);
    const connectedNodes = edges
      .filter(
        (edge) =>
          edge.x1 === startNode.x + 20 || edge.x2 === startNode.x + 20
      )
      .map((edge) =>
        edge.x1 === startNode.x + 20
          ? nodes.find((n) => n.x + 20 === edge.x2)
          : nodes.find((n) => n.x + 20 === edge.x1)
      );
    connectedNodes.forEach((node) => dfs(node, visited, order));
    return order;
  };

  // Breadth-First Search (BFS)
  const bfs = (startNode) => {
    const queue = [startNode];
    const visited = new Set();
    const order = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (!node || visited.has(node)) continue;
      visited.add(node);
      order.push(node.label);
      const connectedNodes = edges
        .filter(
          (edge) =>
            edge.x1 === node.x + 20 || edge.x2 === node.x + 20
        )
        .map((edge) =>
          edge.x1 === node.x + 20
            ? nodes.find((n) => n.x + 20 === edge.x2)
            : nodes.find((n) => n.x + 20 === edge.x1)
        );
      queue.push(...connectedNodes);
    }
    return order;
  };

  // Start traversal
  const startTraversal = () => {
    if (isTraversing) return;
    const startNode = nodes.find((node) => node.label === nodeLabel);
    if (!startNode) return;
    setIsTraversing(true);
    const order =
      traversalType === "DFS" ? dfs(startNode) : bfs(startNode);
    setTraversalOrder(order);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      if (step >= order.length) {
        clearInterval(interval);
        setIsTraversing(false);
      } else {
        setCurrentStep(step);
        step++;
      }
    }, 1000);
  };

  return (
    <div className="graph-visualizer">
      <h1>Graph Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          placeholder="Node label"
        />
        <button onClick={addNode}>Add Node</button>
        <input
          type="text"
          value={selectedNode}
          onChange={(e) => setSelectedNode(e.target.value)}
          placeholder="Edge (start,end)"
        />
        <button onClick={addEdge}>Add Edge</button>
        <select onChange={(e) => setTraversalType(e.target.value)}>
          <option value="DFS">DFS</option>
          <option value="BFS">BFS</option>
        </select>
        <button onClick={startTraversal}>Start {traversalType}</button>
      </div>
      <svg className="graph-container">
        {edges.map((edge, index) => (
          <GraphEdge key={index} edge={edge} />
        ))}
        {nodes.map((node) => (
          <GraphNode
            key={node.id}
            node={node}
            isVisited={traversalOrder.slice(0, currentStep + 1).includes(node.label)}
          />
        ))}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
