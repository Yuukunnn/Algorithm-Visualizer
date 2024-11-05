import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VisualizerHome.css";
import { FaHome } from 'react-icons/fa'; // Import the home icon from react-icons/fa
// Image URLs for visualizers
const binaryTreeImage = "https://static.javatpoint.com/ds/images/binary-tree.png";
const linkedListImage = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2013/03/Linkedlist.png";
const stackQueueImage = "https://gohighbrow.com/wp-content/uploads/2018/07/Computer-science-fundamentals_6.1.png";
const graphImage = "https://www.tutorialspoint.com/data_structures_algorithms/images/Directed_Graph.jpg";
const binarySearchImage = "https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_algorithm.jpg";
const convexHullImage = "https://media.geeksforgeeks.org/wp-content/uploads/20231218123325/Convex-Hull.jpg"; // Example Convex Hull image
const quizBackgroundVideo = "https://cdn.dribbble.com/userupload/3135592/file/original-bfd629edbc5919d3768b1f1c95e988e5.mp4";
const VisualizerHome = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div className="home-container">
      <div className="header-container">
        <FaHome size={30} className="home-icon" onClick={navigateHome} /> {/* Clickable home icon */}
        <h1>Data Structure Visualizers</h1>
      </div>
      <div className="card-container">
        <Link to="/binarytree" className="card">
          <img src={binaryTreeImage} alt="Binary Tree Visualizer" />
          <h3>Binary Tree</h3>
        </Link>
        <Link to="/linkedlist" className="card">
          <img src={linkedListImage} alt="Linked List Visualizer" />
          <h3>Linked List</h3>
        </Link>
        <Link to="/stackqueue" className="card">
          <img src={stackQueueImage} alt="Stack and Queue Visualizer" />
          <h3>Stack and Queue</h3>
        </Link>
        <Link to="/graph" className="card">
          <img src={graphImage} alt="Graph Visualizer" />
          <h3>Graph</h3>
        </Link>
        <Link to="/binarysearch" className="card">
          <img src={binarySearchImage} alt="Binary Search Visualizer" />
          <h3>Binary Search</h3>
        </Link>
        <Link to="/convexhull" className="card">
          <img src={convexHullImage} alt="Convex Hull Visualizer" />
          <h3>Convex Hull</h3>
        </Link>
      </div>
      {/* Separate centered card for Quiz */}
      <div className="quiz-card-container">
        <Link to="/Quiz" className="quiz-card">
          <video className="quiz-background" autoPlay loop muted>
            <source src={quizBackgroundVideo} type="video/mp4" />
          </video>
          <h3>Take the Quiz!</h3>
        </Link>
      </div>
    </div>
  );
};
export default VisualizerHome;