import React from "react";
import './PathfinderContainer.css'; // Ensure you have this file with the above CSS
const PathfinderContainer = () => {
  return (
    <div className="path-container">
      <div className="title-container">
        <h2 className="title-font">Why Our Users Love the Pathfinding Visualizer</h2>
      </div>
      <div className="path2-container">
        <div className="features">
          <div className="feature">
            <img src="/images/DoingPic.jpg" alt="Learn by doing" />
            <h3>Learn by Doing</h3>
            <p>Engage with interactive lessons that make complex algorithms easy to understand through visual demonstrations.</p>
            <a href="#">Explore More</a>
          </div>
          <div className="feature">
            <img src="/images/LessonsPic.jpg" alt="Bite-Sized Lessons" />
            <h3>Bite-Sized Lessons</h3>
            <p>Develop a consistent learning habit with quick, game-like exercises that fit into your daily routine.</p>
            <a href="#">Start Learning</a>
          </div>
          <div className="feature">
            <img src="/images/PencilPic.jpg" alt="Sharpen Your Thinking" />
            <h3>Sharpen Your Thinking</h3>
            <p>Enhance your problem-solving skills with algorithm visualizations that challenge your understanding and boost your confidence.</p>
            <a href="#">Improve Skills</a>
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-container-video">
            <video className="bottom-container-video-size" src="/mp4/DijykstrasGrab.mp4" autoPlay loop muted>
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bottom-container-text">
            <div className="bottom-container-text-content">
              <h2>Learn Algorithms Anytime, Anywhere</h2>
              <p>Our platform allows you to explore and master algorithms on the go. Whether you're at home or commuting, take advantage of our flexible learning tools to sharpen your skills.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PathfinderContainer;