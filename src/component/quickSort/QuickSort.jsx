import React from "react";
import "./quickSort.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

export const QuickSortButton = ({ onClick, isActive }) => (
  <button onClick={onClick} className={`quick-btn ${isActive ? "active" : ""}`}>
    Quick Sort
  </button>
);

const QuickSort = () => {
  const QuickVideo = process.env.PUBLIC_URL + "./mp4/quicksort.mp4";
  const navigate = useNavigate();
  const navigateToLearnMore = () => {
    navigate("/learnmore");
  };

  return (
    <section className="section-container">
      <div className="quick-video-container">
        <video className="quick-vid" src={QuickVideo} autoPlay loop muted />
      </div>
      <p className="quick-description">
        Quick Sort is a highly efficient sorting algorithm that uses a
        divide-and-conquer strategy. It works by partitioning the array into
        smaller segments, sorting those segments, and then combining them to
        produce a sorted array.
        <br />
        <button className="learn-more-btn" onClick={navigateToLearnMore}>
          Learn more
        </button>
      </p>
    </section>
  );
};

export default QuickSort;
