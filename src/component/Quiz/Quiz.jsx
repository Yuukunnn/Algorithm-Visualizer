import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import { data } from './data.js';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [shuffledData, setShuffledData] = useState([]);
    const [numQuestions, setNumQuestions] = useState(5); // Default to 5 questions
    const [quizStarted, setQuizStarted] = useState(false); // Track if quiz has started
    const [showReview, setShowReview] = useState(false); // Track if review is being shown
    const [userAnswers, setUserAnswers] = useState([]); // Store user's answers
    const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options

    const navigate = useNavigate();

    useEffect(() => {
        if (quizStarted) {
            const shuffledQuestions = [...data].sort(() => Math.random() - 0.5).slice(0, numQuestions);
            setShuffledData(shuffledQuestions);
            setQuestion(shuffledQuestions[0]);
            shuffleOptions(shuffledQuestions[0]); // Shuffle options for the first question
        }
    }, [quizStarted, numQuestions]);

    const shuffleOptions = (question) => {
        const options = [
            { text: question.option1, id: 1 },
            { text: question.option2, id: 2 },
            { text: question.option3, id: 3 },
            { text: question.option4, id: 4 }
        ];
        const shuffled = options.sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setShowReview(false); // Ensure review is hidden when starting a new quiz
    };

    const checkAns = (e, selectedId) => {
        if (!isAnswered) {
            const updatedUserAnswers = [...userAnswers];
            updatedUserAnswers.push({
                question: question.question,
                selectedAnswer: selectedId,
                correctAnswer: question.ans,
                options: shuffledOptions.map(option => option.text)
            });
            setUserAnswers(updatedUserAnswers);

            if (question.ans === selectedId) {
                e.target.classList.add("correct");
                setFeedback("Correct!");
                setScore(score + 1);
            } else {
                e.target.classList.add("wrong");
                setFeedback("Wrong! The correct answer was: " + shuffledOptions.find(option => option.id === question.ans).text);

                document.querySelectorAll('li').forEach((li, i) => {
                    if (shuffledOptions[i].id === question.ans) {
                        li.classList.add("correct");
                    }
                });
            }
            setIsAnswered(true);
        }
    };

    const nextQuestion = () => {
        if (index < shuffledData.length - 1) {
            setIndex(index + 1);
            setQuestion(shuffledData[index + 1]);
            shuffleOptions(shuffledData[index + 1]); // Shuffle options for the next question
            setIsAnswered(false);
            setFeedback("");
            document.querySelectorAll('li').forEach(li => {
                li.classList.remove("correct", "wrong");
            });
        } else {
            setIsCompleted(true);
        }
    };

    const retryQuiz = () => {
        setIndex(0);
        setScore(0);
        setFeedback("");
        setIsCompleted(false);
        setIsAnswered(false);
        setQuizStarted(false);
        setShowReview(false);
        setUserAnswers([]);
        setShuffledOptions([]);
        document.querySelectorAll('li').forEach(li => {
            li.classList.remove("correct", "wrong");
        });
    };

    const goHome = () => {
        navigate('/');
    };

    const reviewQuiz = () => {
        setShowReview(true);
    };

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            <hr />
            {!quizStarted ? (
                <>
                    <label htmlFor="numQuestions" className="dropdown-label">How many questions would you like?</label>
                    <select
                        id="numQuestions"
                        className="styled-dropdown"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={30}>30</option>
                    </select>
                    <button onClick={startQuiz} className="start-button">Start</button>
                </>
            ) : isCompleted && !showReview ? (
                <>
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {((score / shuffledData.length) * 100).toFixed(2)}%</p>
                    <button onClick={reviewQuiz}>Review</button>
                    <button onClick={retryQuiz}>Retry</button>
                    <button onClick={goHome}>Home</button>
                </>
            ) : showReview ? (
                <>
                    <h2>Review Your Answers</h2>
                    {userAnswers.map((answer, i) => (
                        <div key={i} className="review-item">
                            <h3>{i + 1}. {answer.question}</h3>
                            <ul>
                                {answer.options.map((option, index) => (
                                    <li
                                        key={index}
                                        className={
                                            (index + 1 === answer.correctAnswer ? 'correct' : '') +
                                            (index + 1 === answer.selectedAnswer && index + 1 !== answer.correctAnswer ? ' wrong' : '')
                                        }
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button onClick={retryQuiz}>Retry</button>
                    <button onClick={goHome}>Home</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {shuffledOptions.map((option, i) => (
                            <li key={i} onClick={(e) => { checkAns(e, option.id) }}>
                                {option.text}
                            </li>
                        ))}
                    </ul>
                    {feedback && <p className="feedback">{feedback}</p>}
                    <button onClick={nextQuestion} disabled={!isAnswered}>Next</button>
                    <div className="index">{index + 1} of {shuffledData.length}</div>
                </>
            )}
        </div>
    );
}

export default Quiz;
