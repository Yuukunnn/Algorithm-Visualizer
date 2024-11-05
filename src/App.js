import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./component/landingpage/LandingPage.jsx";
import Login from "./component/Login/Login.jsx";
import SignUp from "./component/Login/SignUp.jsx";
import Account from "./component/Login/Account.jsx";
import ResetPassword from "./component/Login/ResetPassword.jsx";
import SortContainer from "./component/sortContainer/SortContainer.jsx";
import MiddleTitle from "./component/middletitle/MiddleTitle.jsx";
import Sorting from "./component/Sorting/Sorting.jsx";
import AboutUs from './component/footer/AboutUs.jsx';
import Testimonials from './component/footer/Testimonials.jsx';
import ChatCat from './component/chatCat/chatCat.js';
import Pathfinding from "./component/Pathfinding/Pathfinding.js";
import LearnMore from "./component/learmore/LearnMore.jsx";
import ContactUs from './component/footer/ContactUs.jsx';
import Footer from "./component/footer/Footer.jsx";
import MockInterview from './component/MockInterview/MockInterview.jsx';
import Quiz from './component/Quiz/Quiz.jsx';
import BinaryTreeVisualizer from './component/binaryTree/BinaryTreeVisualizer.jsx';
import LinkedListVisualizer from './component/LinkedList/LinkedListVisualizer.jsx';
import StackQueueVisualizer from './component/StackAndQueue/StackQueueVisualizer.jsx';
import GraphVisualizer from './component/graph-visual/GraphVisualizer.jsx';
import BinarySearchVisualizer from './component/binarySearch/BinarySearchVisualizer.jsx';
import VisualizerHome from './component/visualizerProfile/VisualizerHome.jsx';
import ConvexHull from './component/ConvexHull/ConvexHull.js';
import Loader from "./component/LoaderPage/Loader.jsx";

// Import Goal components
import { SelectionScreen, NextScreen, TopicSelectionScreen, ComfortLevelScreen, LearningFitScreen } from './component/Goal/Goal.jsx';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time to match your actual loading duration
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/sortcontainer" element={<SortContainer />} />
        <Route path="/middletitle" element={<MiddleTitle />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path="/pathfinding" element={<Pathfinding />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/mockinterview' element={<MockInterview />} />
        <Route path='/Quiz' element={<Quiz />} />
        <Route path='/binarytree' element={<BinaryTreeVisualizer />} />
        <Route path='/linkedlist' element={<LinkedListVisualizer />} />
        <Route path='/stackqueue' element={<StackQueueVisualizer />} />
        <Route path='/graph' element={<GraphVisualizer />} />
        <Route path='/binarysearch' element={<BinarySearchVisualizer />} />
        <Route path='/visualizerhome' element={<VisualizerHome />} />
        <Route path='/convexhull' element={<ConvexHull />} />
        {/* Add Goal-related routes */}
        <Route path="/goal" element={<SelectionScreen />} />
        <Route path="/goal/next" element={<NextScreen />} />
        <Route path="/topic-selection" element={<TopicSelectionScreen />} />
        <Route path="/comfort-level" element={<ComfortLevelScreen />} />
        <Route path="/learning-fit" element={<LearningFitScreen />} />
      </Routes>
      <ChatCat />
      {/* <Footer /> */}
    </Router>
  );
}
export default App;