import React from "react";
import "./bubbleSort.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

export const BubbleSortButton = ({ onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`bubble-btn ${isActive ? "active" : ""}`}
  >
    Bubble Sort
  </button>
);

const BubbleSort = () => {
  const BubbleVideo = process.env.PUBLIC_URL + "./mp4/bubblesort.mp4";
  const navigate = useNavigate();
  const navigateToLearnMore = () => {
    navigate("/learnmore");
  };

  return (
    <section className="section-container">
      <div className="bubble-video-container">
        <video className="bubble-vid" src={BubbleVideo} autoPlay loop muted />
      </div>
      <p className="bubble-description">
        Bubble Sort shares many properties with insertion sort but generally has
        higher overhead. For nearly sorted data, bubble sort can achieve a time
        complexity of \(O(n)\), though it still requires at least two passes
        through the array. In contrast, insertion sort can often complete the
        sorting in approximately one pass through the data.{" "}
        <br />
        {/* <a className="learn-more-href" href="/learnmore">
          Learn more
        </a> */}
        <button className="learn-more-btn" onClick={navigateToLearnMore}>
          Learn more
        </button>
      </p>
    </section>
  );
};

export default BubbleSort;
