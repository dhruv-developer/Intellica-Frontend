import { useState } from "react";
import axios from "axios";

export default function LearningPath() {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [path, setPath] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLearningPath = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/learning/generate_learning_path/", {
        user_id: "USER_ID",
        goal,
      });
      setSkills(data.required_skills);
      setQuiz(data.quiz);
      setPath(data.learning_path);
      setMessage("Learning Path Generated!");
    } catch (error) {
      setMessage("Failed to generate learning path.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-primary">Learning Path Generator</h2>
      <input type="text" placeholder="What do you want to build?" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <button onClick={fetchLearningPath} className="bg-secondary text-white p-2 rounded">Get Learning Path</button>
      <p className="text-center mt-2 text-green-500">{message}</p>

      <h3 className="mt-4 text-xl font-bold text-accent">Required Skills</h3>
      <ul>{skills.map((skill, i) => <li key={i} className="text-primary">{skill}</li>)}</ul>

      <h3 className="mt-4 text-xl font-bold text-accent">Quiz</h3>
      <ul>{quiz.map((q, i) => <li key={i}>{q.question}</li>)}</ul>

      <h3 className="mt-4 text-xl font-bold text-accent">Learning Path</h3>
      <ul>{path.map((step, i) => <li key={i}>{step}</li>)}</ul>
    </div>
  );
}
