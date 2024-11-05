import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Goal.css';

// First screen: Introduction to the platform
const SelectionScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/goal/next');
  };

  return (
    <div className="goal-container">
      <div className="question-container">
        <span className="question-icon">ℹ️</span>
        <span className="question-text">Welcome to Our Learning Platform!</span>
      </div>
      <div className="options">
        <div className="option">
          <span className="icon">📘</span>
          <span className="label">Understand the basics of algorithms and data structures.</span>
        </div>
        <div className="option">
          <span className="icon">🚀</span>
          <span className="label">Explore advanced concepts with detailed explanations.</span>
        </div>
        <div className="option">
          <span className="icon">🧩</span>
          <span className="label">Engage in interactive learning experiences.</span>
        </div>
        <div className="option">
          <span className="icon">📝</span>
          <span className="label">Test your knowledge with quizzes and practice problems.</span>
        </div>
        <div className="option">
          <span className="icon">⚡</span>
          <span className="label">Get started quickly with our intuitive platform.</span>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

// Second screen: Overview of platform features
const NextScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/topic-selection');
  };

  return (
    <div className="goal-container">
      <div className="question-container">
        <span className="question-icon">💡</span>
        <span className="question-text">Features of Our Platform</span>
      </div>
      <div className="options">
        <div className="option">
          <span className="icon">🔍</span>
          <span className="label">Visualize algorithms in action with step-by-step guides.</span>
        </div>
        <div className="option">
          <span className="icon">💪</span>
          <span className="label">Learn by doing with hands-on activities and challenges.</span>
        </div>
        <div className="option">
          <span className="icon">📈</span>
          <span className="label">Track your progress and see your improvements over time.</span>
        </div>
        <div className="option">
          <span className="icon">🧠</span>
          <span className="label">Gain insights from experts in the field.</span>
        </div>
        <div className="option">
          <span className="icon">🤝</span>
          <span className="label">Join a community of learners and share your journey.</span>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

// Third screen: How to navigate the platform
const TopicSelectionScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/comfort-level');
  };

  return (
    <div className="goal-container">
      <div className="question-container">
        <span className="question-icon">🚀</span>
        <span className="question-text">Getting Started with Your Learning Journey</span>
      </div>
      <div className="options">
        <div className="option">
          <span className="icon">🔬</span>
          <span className="label">Explore various topics like sorting, searching, and more.</span>
        </div>
        <div className="option">
          <span className="icon">📝</span>
          <span className="label">Practice problems to reinforce your understanding.</span>
        </div>
        <div className="option">
          <span className="icon">🧩</span>
          <span className="label">Take quizzes to test your knowledge.</span>
        </div>
        <div className="option">
          <span className="icon">🏆</span>
          <span className="label">Join challenges and compete with peers.</span>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

// Fourth screen: Encouraging practice and participation
const ComfortLevelScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/learning-fit');
  };

  return (
    <div className="goal-container">
      <div className="question-container">
        <span className="question-icon">🔍</span>
        <span className="question-text">Engage with the Content Your Way</span>
      </div>
      <div className="comfort-level-options">
        <div className="comfort-level-option">
          <pre className="code-snippet">Take it slow and steady</pre>
          <span className="level">Beginner</span>
          <span className="description">Start with the basics and gradually build up.</span>
        </div>
        <div className="comfort-level-option">
          <pre className="code-snippet">Ready to dive deeper</pre>
          <span className="level">Intermediate</span>
          <span className="description">Tackle more complex challenges as you progress.</span>
        </div>
        <div className="comfort-level-option">
          <pre className="code-snippet">Master the content</pre>
          <span className="level">Advanced</span>
          <span className="description">Test your expertise with advanced problems.</span>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

// Final screen: Motivating users to start learning
const LearningFitScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/visualizerhome'); // Navigate to VisualizerHome
  };

  return (
    <div className="goal-container">
      <div className="question-container">
        <span className="question-icon">🏁</span>
        <span className="question-text">Integrate Learning into Your Daily Routine</span>
      </div>
      <div className="options">
        <div className="option">
          <span className="icon">🌅</span>
          <span className="label">Start your day with a new concept.</span>
        </div>
        <div className="option">
          <span className="icon">🍕</span>
          <span className="label">Use breaks to refresh your knowledge.</span>
        </div>
        <div className="option">
          <span className="icon">🌙</span>
          <span className="label">Wind down your day with learning.</span>
        </div>
        <div className="option">
          <span className="icon">💻</span>
          <span className="label">Learn at your own pace and time.</span>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Learn by Seeing
      </button>
    </div>
  );
};

// Export all components correctly
export { SelectionScreen, NextScreen, TopicSelectionScreen, ComfortLevelScreen, LearningFitScreen };
export default SelectionScreen;
