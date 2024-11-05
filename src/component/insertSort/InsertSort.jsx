import React from "react";
import "./insertSort.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

export const InsertSortButton = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`insert-btn ${isActive ? "active" : ""}`}
  >
    Insert Sort
  </button>
);

const InsertSort = () => {
  const InsertVideo = process.env.PUBLIC_URL + "./mp4/insertsort.mp4";
  const navigate = useNavigate();
  const navigateToLearnMore = () => {
    navigate("/learnmore");
  };

  return (
    <section className="section-container">
      <div className="insert-video-container">
        <video className="insert-vid" src={InsertVideo} autoPlay loop muted />
      </div>
      <p className="insert-description">
        Insertion Sort is a straightforward sorting algorithm that builds the
        sorted array one element at a time. It’s akin to sorting playing cards
        by inserting each card into its correct position among the already
        sorted cards in your hand.
        <br />
        <button className="learn-more-btn" onClick={navigateToLearnMore}>
          Learn more
        </button>
      </p>
    </section>
  );
};

export default InsertSort;
