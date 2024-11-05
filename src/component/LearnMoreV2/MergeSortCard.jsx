import React, { useState } from 'react';
import './MergeSortCard.css';

const MergeSortCard = ({ title, videoSrc, summary, details }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-front">
        <video 
          className="video-size" 
          src="/mp4/mergesort.mp4"  
          loop 
          autoPlay 
          muted 
        />
        <button onClick={handleFlip}>Learn {title}</button>
      </div>
      <div className="card-back">
        <div className="info-box">
          <summary>Merge Sort</summary>
          <p>Merge sort is very predictable. It makes between 0.5lg(n) and lg(n)
              comparisons per element, and between lg(n) and 1.5lg(n) swaps per
              element. The minima are achieved for already sorted data; the maxima
              are achieved, on average, for random data. If using Θ(n) extra space
              is of no concern, then merge sort is an excellent choice: It is simple
              to implement, and it is the only stable O(n·lg(n)) sorting algorithm.
              Note that when sorting linked lists, merge sort requires only Θ(lg(n))
              extra space (for recursion).
            </p>
            <p>
              Merge sort is the algorithm of choice for a variety of situations:
              when stability is required, when sorting linked lists, and when random
              access is much more expensive than sequential access (for example,
              external sorting on tape). There do exist linear time in-place merge
              algorithms for the last step of the algorithm, but they are both
              expensive and complex. The complexity is justified for applications
              such as external sorting when Θ(n) extra space is not available.
            </p>
            <ul>
              Properties
              <li>Stable</li>
              <li>Θ(n) extra space for arrays (as shown)</li>
              <li>Θ(lg(n)) extra space for linked lists</li>
              <li>Θ(n·lg(n)) time</li>
              <li>Not adaptive</li>
              <li>Does not require random access to data</li>
            </ul>
        </div>
        <button onClick={handleFlip}>Back</button>
      </div>
    </div>
  );
};

export default MergeSortCard;
