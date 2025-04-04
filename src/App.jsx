import React, { useState, useEffect } from "react";

import Descriptions from "./components/Descriptions/Descriptions";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

import "./App.module.css";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = window.localStorage.getItem("saved-feedback");
    
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    };

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

   useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = feedbackType => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  
  const resetFeedback = () => setFeedback({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const positiveFeedback = Math.round(
    ((feedback.good + feedback.neutral) / totalFeedback) * 100
  );

  return (
    <>
      <Descriptions />
      <Options updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback} />
      {totalFeedback > 0 ? (
        <Feedback feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />) :
        (<Notification />
        )}
    </>
  );
};

export default App;