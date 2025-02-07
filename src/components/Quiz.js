import { useState } from "react";
import axios from "axios";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuiz = async () => {
    const { data } = await axios.post("http://localhost:8000/quiz/start_quiz/", { user_id: "USER_ID" });
    setQuestions(data.questions);
  };

  const submitAnswer = async (answer) => {
    const { data } = await axios.post("http://localhost:8000/quiz/answer_question/", { user_id: "USER_ID", answer });
    setScore(data.score);
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-primary">Quiz</h2>
      {questions.length === 0 ? (
        <button onClick={fetchQuiz} className="bg-secondary text-white p-2 rounded">Start Quiz</button>
      ) : (
        <>
          <h3 className="mb-2 text-accent">{questions[current].question}</h3>
          {questions[current].options.map((option, i) => (
            <button key={i} onClick={() => submitAnswer(option)} className="block w-full bg-gray-200 p-2 rounded mb-2 hover:bg-secondary hover:text-white transition">{option}</button>
          ))}
          {current === questions.length - 1 && <p className="text-green-500">Final Score: {score}</p>}
        </>
      )}
    </div>
  );
}
