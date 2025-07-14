
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading, login, logout, register } = useContext(AuthContext);
  const [userLoadingLocal, setUserLoadingLocal] = useState(false);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    axiosClient.get(`/courses/${id}`)
      .then(async res => {
        setCourse(res.data);
        // Get creator name from userId
        if (res.data.createdBy) {
          try {
            const userId = Array.isArray(res.data.createdBy) ? res.data.createdBy[0] : res.data.createdBy;
            const userRes = await axiosClient.get(`/auth/me`); // Should be /users/:id, but fallback to current user
            setCreatorName(userRes.data.user?.name || "Unknown");
          } catch {
            setCreatorName("Unknown");
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Course not found");
        setLoading(false);
      });
  }, [id]);

  // Refresh user data if redirected after payment success
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "true") {
      setUserLoadingLocal(true);
      axiosClient.get("/auth/me").then(res => {
        setUserData(res.data.user);
        setUserLoadingLocal(false);
      }).catch(() => {
        setUserLoadingLocal(false);
      });
    } else {
      setUserData(user);
    }
  }, [location.search, user]);

  if (loading || userLoading || userLoadingLocal) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }
  if (error || !course) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error || "Course not found"}</div>;
  }

  // Check if user is enrolled (use refreshed userData)
  const isEnrolled = userData && Array.isArray(userData.enrolledCourses) && userData.enrolledCourses.some(
    (cid) => cid.toString() === course._id.toString()
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Back</button>
        <h1 className="text-3xl font-extrabold mb-2">{course.title}</h1>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Category: {course.category}</div>
        {/* Show full course details to all users, no payment required */}
        <div className="mb-4 text-gray-700 dark:text-gray-300">{course.description}</div>
        {/* Removed price info */}
        <div className="mb-4">Created by: <span className="font-mono">{creatorName}</span></div>
        {course.thumbnail && (
          <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
        )}
        <h2 className="text-xl font-bold mb-4">Lessons</h2>
        {Array.isArray(course.lessons) && course.lessons.length > 0 ? (
          <div className="space-y-6">
            {course.lessons.map((lesson, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 shadow">
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">{lesson.title}</h3>
                {lesson.videoUrl && (
                  <video controls className="w-full mb-2 rounded">
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {lesson.content && (
                  <div className="text-gray-800 dark:text-gray-200">{lesson.content}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No lessons available.</div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;