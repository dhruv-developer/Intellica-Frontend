import { useState } from "react";
import axios from "axios";

export default function CourseRecommendations() {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/recommendations/recommend_courses/", {
        user_id: "USER_ID",
        send_email: sendEmail,
        user_email: email,
      });
      setCourses(data.real_courses.udemy.concat(data.real_courses.coursera, data.real_courses.youtube));
      setMessage("Courses Fetched!");
    } catch (error) {
      setMessage("Failed to fetch courses.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-primary">Recommended Courses</h2>
      <input type="email" placeholder="Enter Email (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" />
      <label className="flex items-center mb-4">
        <input type="checkbox" checked={sendEmail} onChange={() => setSendEmail(!sendEmail)} className="mr-2" />
        Send recommendations to email
      </label>
      <button onClick={fetchCourses} className="bg-secondary text-white p-2 rounded">Get Courses</button>
      <p className="text-center mt-2 text-green-500">{message}</p>
      <ul className="mt-4">
        {courses.map((course, i) => (
          <li key={i} className="mb-2">
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{course.course_name} ({course.platform})</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
