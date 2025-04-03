import React, { useState } from "react";
import Descriptions from "./Descriptions/Descriptions";
import Feedback from "./Feedback/Feedback";
import Options from "./Options/Options";

import "./App.css";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = feedbackType => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };


  return (
    <>
      <Descriptions />
      <Options updateFeedback={updateFeedback} />
      <Feedback feedback={feedback} />
      </>
  );
};

export default App;