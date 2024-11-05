// useTestimonials.js

import { useState } from "react";
import { validateTestimonial, filterTestimonials, sortTestimonials } from "./testimonialUtils";
import { testimonials as initialTestimonials } from "./testimonials";

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newUser, setNewUser] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errors, setErrors] = useState({
    user: false,
    rating: false,
    comment: false,
  });

  const addTestimonial = (callback) => {
    const { hasError, errors: validationErrors } = validateTestimonial(newUser, newRating, newComment);

    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    const newTestimonial = {
      id: Date.now(),
      user: newUser,
      rating: Number(newRating),
      comment: newComment,
      date: new Date().toISOString(),
    };

    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
    setNewUser("");
    setNewRating("");
    setNewComment("");
    setErrors({ user: false, rating: false, comment: false });
    callback(); // Callback for success handling
  };

  return {
    testimonials,
    setTestimonials,
    newUser,
    setNewUser,
    newRating,
    setNewRating,
    newComment,
    setNewComment,
    errors,
    setErrors,
    addTestimonial,
    filterTestimonials,
    sortTestimonials,
  };
};

export default useTestimonials;
