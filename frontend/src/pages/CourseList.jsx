import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

const CourseList = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      axiosClient.get("/courses")
        .then(res => {
          setCourses(res.data);
          setCoursesLoading(false);
        })
        .catch(err => {
          setError("Failed to load courses");
          setCoursesLoading(false);
        });
    }
  }, [user]);

  if (loading || coursesLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Hello {user.name}</h1>
        {error ? (
          <div className="text-center text-red-500 mb-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400 dark:text-gray-500 text-lg font-semibold">No courses available.</div>
            ) : (
              courses.map((course) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-56 flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 hover:shadow-lg transition cursor-pointer overflow-hidden"
                >
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-t-xl mb-2"
                    />
                  )}
                  <div className="font-bold text-lg mb-1 text-center px-2">{course.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{course.category}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 px-2 text-center">{course.description}</div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;