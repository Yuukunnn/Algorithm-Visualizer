import React from "react";
import "./mergeSort.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

export const MergeSortButton = ({ onClick, isActive }) => (
  <button onClick={onClick} className={`merge-btn ${isActive ? "active" : ""}`}>
    Merge Sort
  </button>
);

const MergeSort = () => {
  const MergeVideo = process.env.PUBLIC_URL + "./mp4/mergesort.mp4";
  const navigate = useNavigate();
  const navigateToLearnMore = () => {
    navigate("/learnmore");
  };

  return (
    <section className="section-container">
      <div className="merge-video-container">
        <video className="merge-vid" src={MergeVideo} autoPlay loop muted />
      </div>
      <p className="merge-description">
        Merge Sort is a classic divide-and-conquer algorithm for sorting arrays.
        It works by recursively splitting the array into halves until each
        subarray contains a single element or is empty. Then, it merges these
        subarrays back together in a sorted order.
        <br />
        <button className="learn-more-btn" onClick={navigateToLearnMore}>
          Learn more
        </button>
      </p>
    </section>
  );
};

export default MergeSort;
