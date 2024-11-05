import React from "react";
import "./selectionSort.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

export const SelectionSortButton = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`selection-btn ${isActive ? "active" : ""}`}
  >
    Selection Sort
  </button>
);

const SelectionSort = () => {
  const SelectionVideo = process.env.PUBLIC_URL + "./mp4/selectionsort.mp4";
  const navigate = useNavigate();
  const navigateToLearnMore = () => {
    navigate("/learnmore");
  };

  return (
    <section className="section-container">
      <div className="selection-video-container">
        <video
          className="selection-vid"
          src={SelectionVideo}
          autoPlay
          loop
          muted
        />
      </div>
      <p className="selection-description">
        Selection Sort is a simple, in-place sorting algorithm that works by
        repeatedly finding the minimum element from the unsorted portion of the
        array and swapping it with the first unsorted element.
        <br />
        <button className="learn-more-btn" onClick={navigateToLearnMore}>
          Learn more
        </button>
      </p>
    </section>
  );
};

export default SelectionSort;
