import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import LearningPathPage from "./pages/LearningPathPage";
import CoursePage from "./pages/CoursePage";
import YouTubePage from "./pages/YouTubePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-6 bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="/recommendations" element={<CoursePage />} />
          <Route path="/youtube" element={<YouTubePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
