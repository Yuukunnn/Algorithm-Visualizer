import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import selectionSort from "./algorithms/SelectionSort";
import mergeSort from "./algorithms/MergeSort";
import quickSort from "./algorithms/QuickSort";
import { NavLink } from "react-router-dom";
import "./Sorting.css";

const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const Sorting = () => {
  const [arr, setArr] = useState([]);
  const [method, setMethod] = useState("Algorithms");
  const [length, setLength] = useState(0);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);
  const [isControlsDropdownOpen, setIsControlsDropdownOpen] = useState(false);
  const [inputArray, setInputArray] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const [inputError, setInputError] = useState(""); // Error state for input

// Function to create a random array
const createArray = (e = Math.floor(window.innerWidth / 50) / 2) => {
  let newArr = [];
  for (let i = 0; i < e; i++) {
    newArr.push({
      value: Math.floor(Math.random() * 150),
      id: "id-" + i,
    });
  }
  setArr(newArr);
  setLength(e);
  setSorted([]);
  setSteps([]); // Reset steps
  setCurrentStep(0); // Reset current step
};


  // Function to handle array size change
const changeArray = (e) => {
  const newLength = e.target.value;

  // Check if sorting is currently running
  if (isPlaying) {
    // Prompt the user for confirmation
    const userConfirmed = window.confirm(`Are you sure you want to change the array length to ${newLength}? This will stop the current sorting process.`);
    
    if (userConfirmed) {
      // Stop the ongoing sorting process
      clearInterval(intervalRef.current);
      setIsPlaying(false);

      // Generate a new array with the confirmed length
      createArray(newLength);
    }
  } else {
    // If sorting is not running, just change the array length
    createArray(newLength);
  }
};


  // Initial array creation and window resize handling
  useEffect(() => {
    createArray();
    const handleResize = () => {
      createArray();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect hook to manage interval for automatic step changes
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextStep();
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, currentStep]);

  // Function to randomize the array
  const randomize = () => {
    // Stop any ongoing sorting process
    clearInterval(intervalRef.current);
    setIsPlaying(false); // Stop the play/pause state

    // Clear the steps and reset the current step
    setSteps([]);
    setCurrentStep(0);

    // Generate a new random array
    createArray(length);
  };

  // Function to handle input changes for array elements
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if the value contains only numbers and commas
    const isValidInput = /^[0-9,]*$/.test(value);

    if (isValidInput || value === "") {
      setInputArray(value);
      setInputError(""); // Clear error on valid input change
    } else {
      setInputError("Input can only contain numbers and commas!"); // Set error if input is invalid
      
      // Clear error after 1 second
      setTimeout(() => {
        setInputError("");
      }, 1000);
    }
  };

  // Function to handle form submission for setting array elements
  const handleArraySubmit = (e) => {
    e.preventDefault();
    if (!inputArray.trim()) {
      setInputError("Input cannot be empty!"); // Set error if input is empty
      // Clear error after 1 second
      setTimeout(() => {
        setInputError("");
      }, 1000);
      return;
    }

    const newArr = inputArray.split(",").map((num, index) => {
      const parsedNum = parseInt(num.trim());
      // Validate number range (1-200)
      if (parsedNum < 1 || parsedNum > 200 || isNaN(parsedNum)) {
        setInputError("Numbers must be between 1 and 200!"); // Set error for invalid numbers
        // Clear error after 1 second
        setTimeout(() => {
          setInputError("");
        }, 1000);
        return null; // Return null for invalid numbers
      }
      return { value: parsedNum, id: "id-" + index };
    }).filter(el => el !== null); // Filter out invalid numbers

    if (newArr.length === 0) {
      setInputError("Please enter valid numbers!"); // Set error if no valid numbers
      // Clear error after 1 second
      setTimeout(() => {
        setInputError("");
      }, 1000);
      return;
    }

    setArr(newArr);
    setLength(newArr.length);
    setSorted([]);
    setInputArray(""); // Clear the input field after setting the array
  };

  // Function to handle sorting based on selected algorithm
  const sortFunc = (e) => {
    e.preventDefault();
    document.getElementById("error").style.display = "none";
    
    if (method === "Algorithms") {
      document.getElementById("error").style.display = "block";
      return;
    }

    // Clear any existing interval and reset state
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStep(0);

    let results = [];
    if (method === "Selection Sort")
      results = selectionSort(arr, arr.length);
    else if (method === "Merge Sort")
      results = mergeSort(arr, arr.length);
    else if (method === "Quick Sort")
      results = quickSort(arr, arr.length);

    setSteps(results);
    setArr(results[0]);
    setIsPlaying(true);
  };  

  // Function to change the speed of the animation
  const changeSpeed = (e) => {
    setSpeed(1100 - e.target.value);
  };

  // Function to toggle algorithm dropdown
  const toggleAlgorithmDropdown = () => {
    setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen);
    setIsControlsDropdownOpen(false);
  };

  // Function to toggle controls dropdown
  const toggleControlsDropdown = () => {
    setIsControlsDropdownOpen(!isControlsDropdownOpen);
    setIsAlgorithmDropdownOpen(false);
  };

  // Function to select an algorithm from the dropdown
  const selectAlgorithm = (algorithm) => {
    // Check if sorting is currently in progress
    if (isPlaying) {
      // Prompt user to confirm stopping current sort
      const userConfirmed = window.confirm("Sorting is currently in progress. Are you sure you want to change the sorting algorithm? This will stop and reset the current process.");
  
      if (!userConfirmed) {
        return; // If user cancels, do nothing
      }
  
      // Stop the current sorting process
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setSteps([]);
      setCurrentStep(0);
    } else if (currentStep !== 0) {
      // If sorting is paused but not at the start, reset the state
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setSteps([]);
      setCurrentStep(0);
    }
  
    // Set the new algorithm
    setMethod(algorithm);
  
    // Close the dropdown
    setIsAlgorithmDropdownOpen(false);
  };
  

  // Function to go to the next step in the sorting process
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      setArr(steps[currentStep + 1]);
    } else {
      setIsPlaying(false);
    }
  };

  // Function to go to the previous step in the sorting process
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      setArr(steps[currentStep - 1]);
    }
  };

  // Function to toggle between play and pause
  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Sorting Visualizer</div>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={randomize}>
                Randomize
              </a>
            </li>
            <li className="nav-item dropdown" onClick={toggleAlgorithmDropdown}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded={isAlgorithmDropdownOpen}
              >
                {method}
              </a>
              <div
                className={`dropdown-menu ${
                  isAlgorithmDropdownOpen ? "show" : ""
                }`}
                aria-labelledby="navbarDropdown"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => selectAlgorithm("Selection Sort")}
                >
                  Selection Sort
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => selectAlgorithm("Merge Sort")}
                >
                  Merge Sort
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => selectAlgorithm("Quick Sort")}
                >
                  Quick Sort
                </a>
              </div>
            </li>
            <li className="nav-item dropdown" onClick={toggleControlsDropdown}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded={isControlsDropdownOpen}
              >
                Controls
              </a>
              <div
                className={`dropdown-menu ${
                  isControlsDropdownOpen ? "show" : ""
                } controls-dropdown`}
                aria-labelledby="navbarDropdown"
              >
                <div className="dropdown-item">
                  <input
                    onChange={changeArray}
                    type="range"
                    min="2"
                    max={Math.floor(window.screen.width / 50)}
                    defaultValue={Math.floor(window.screen.width / 50 / 2)}
                  />
                  <span>Increase Array Size</span>
                </div>
                <div className="dropdown-item">
                  <input
                    onChange={changeSpeed}
                    type="range"
                    min="100"
                    max="1000"
                    defaultValue="500"
                  />
                  <span>Increase Speed</span>
                </div>
              </div>
            </li>
            <div
              id="error"
              className="alert"
              role="alert"
            >
              Select an algorithm first!
            </div>
          </ul>
          <form className="form-inline" onSubmit={sortFunc}>
            <button className="btn sort-btn" type="submit">
              Sort
            </button>
          </form>
        </div>
      </nav>
      <div className="main-div">
        <div className="input-array-form">
          <form onSubmit={handleArraySubmit} >
            <label>
              Enter array elements (comma separated, 1-200):
              <input
                type="text"
                value={inputArray}
                onChange={handleInputChange}
                placeholder="1,2,3,4,5,6,7,8,9,10"
              />
            </label>
            <button type="submit">Set Array</button>
            {inputError && <div className="error-message">{inputError}</div>}    {/* Error message display */}
          </form>
        </div>
        <div className="controls">
          <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
          <button onClick={nextStep} disabled={currentStep >= steps.length - 1}>Next</button>
          <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        </div>
        <div className="bars">
          {arr.map((element, index) => (
            <motion.div
              key={element.id}
              layout
              transition={springAnim}
              className={`bar ${element.style}`}
              id={element.id}
              style={{
                height: Math.max(element.value * 3, 40), 
                order: index,
              }}
            >
              {element.value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sorting;