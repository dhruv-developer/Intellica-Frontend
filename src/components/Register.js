import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    education_level: "",
    specialization: "",
    preferred_difficulty: "Beginner",
    learning_style: "Video-based",
    budget: 0,
  });
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [sentOtp, setSentOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Send OTP request
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/register/", userData);
      setUserId(response.data.user_id); // Store user ID for verification
      setSentOtp(true);
      setMessage("OTP Sent! Check your email.");
    } catch (error) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  // Verify OTP request
  const verifyOtp = async () => {
    try {
      if (!userId) {
        setMessage("Error: User ID not found. Try registering again.");
        return;
      }
      const response = await axios.post("http://localhost:8000/user/verify_otp/", {
        user_id: userId,
        otp: otp,
      });
      setMessage(response.data.message);
      setVerified(true);
    } catch (error) {
      setMessage("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-secondary shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-white">Register</h2>
      
      {/* Show form only if OTP not verified */}
      {!verified ? (
        <>
          <input type="text" name="name" placeholder="Full Name" value={userData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="education_level" placeholder="Education Level" value={userData.education_level} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="specialization" placeholder="Specialization" value={userData.specialization} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          
          <select name="preferred_difficulty" value={userData.preferred_difficulty} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select name="learning_style" value={userData.learning_style} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="Video-based">Video-based</option>
            <option value="Reading-based">Reading-based</option>
            <option value="Hands-on">Hands-on</option>
          </select>

          <input type="number" name="budget" placeholder="Budget ($)" value={userData.budget} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

          <button onClick={sendOtp} className="w-full bg-primary text-white p-2 rounded">
            {sentOtp ? "Resend OTP" : "Send OTP"}
          </button>

          {sentOtp && (
            <>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <button onClick={verifyOtp} className="w-full bg-accent text-white p-2 rounded mt-2">Verify OTP</button>
            </>
          )}
        </>
      ) : (
        <p className="text-white text-center">✅ Registration Successful! You can now log in.</p>
      )}

      <p className="text-center text-white mt-2">{message}</p>
    </div>
  );
};

export default Register;
