// testimonialUtils.js

export const validateTestimonial = (user, rating, comment) => {
    const errors = {
      user: !user.trim(),
      rating: !rating,
      comment: !comment.trim(),
    };
    return { hasError: Object.values(errors).some(Boolean), errors };
  };
  
  export const filterTestimonials = (testimonials, searchQuery, selectedRating) => {
    return testimonials
      .filter((testimonial) =>
        testimonial.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.comment.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((testimonial) =>
        selectedRating ? testimonial.rating === Number(selectedRating) : true
      );
  };
  
  export const sortTestimonials = (testimonials, sortCriteria) => {
    return [...testimonials].sort((a, b) => {
      if (sortCriteria === "rating") {
        return b.rating - a.rating; // Sort by rating in descending order
      }
      if (sortCriteria === "date") {
        return new Date(b.date) - new Date(a.date); // Sort by date in descending order
      }
      return 0;
    });
  };
  