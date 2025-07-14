import React, { useState, useEffect, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: "",
    lessons: [{ title: "", videoUrl: "", duration: "", description: "", resourceLinks: "" }],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== "Admin")) {
      navigate("/courselist");
    }
  }, [user, loading, navigate]);

  const fetchCourses = () => {
    axiosClient.get("/courses")
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]));
  };

  useEffect(() => {
    if (user && user.role === "Admin") fetchCourses();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (idx, e) => {
    const updatedLessons = form.lessons.map((lesson, i) =>
      i === idx ? { ...lesson, [e.target.name]: e.target.value } : lesson
    );
    setForm({ ...form, lessons: updatedLessons });
  };

  const handleVideoUpload = async (idx, file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post("/imagekit-upload/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedLessons = form.lessons.map((lesson, i) =>
        i === idx ? { ...lesson, videoUrl: res.data.url } : lesson
      );
      setForm({ ...form, lessons: updatedLessons });
    } catch (err) {
      alert("Video upload failed");
    }
  };

  const addLesson = () => {
    setForm({
      ...form,
      lessons: [...form.lessons, { title: "", videoUrl: "", duration: "", description: "", resourceLinks: "" }],
    });
  };

  const removeLesson = (idx) => {
    setForm({
      ...form,
      lessons: form.lessons.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await axiosClient.post("/courses/admin", {
        ...form,
        lessons: form.lessons.map(lesson => ({
          ...lesson,
          resourceLinks: lesson.resourceLinks.split(",").map(l => l.trim()),
        })),
      });
      setSuccess("Course uploaded!");
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        thumbnail: "",
        lessons: [{ title: "", videoUrl: "", duration: "", description: "", resourceLinks: "" }],
      });
      fetchCourses();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to upload course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosClient.delete(`/courses/admin/${id}`);
      fetchCourses();
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  if (loading || !user || user.role !== "Admin") {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Admin Dashboard</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Upload New Course</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" required />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" required />
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" />
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 mb-4" required />
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Lessons</h3>
            {form.lessons.map((lesson, idx) => (
              <div key={idx} className="border rounded-lg p-3 mb-2 bg-gray-50 dark:bg-gray-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <input name="title" value={lesson.title} onChange={e => handleLessonChange(idx, e)} placeholder="Lesson Title" className="px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" required />
                  <input name="duration" value={lesson.duration} onChange={e => handleLessonChange(idx, e)} placeholder="Duration" className="px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" />
                  <input name="resourceLinks" value={lesson.resourceLinks} onChange={e => handleLessonChange(idx, e)} placeholder="Resource Links (comma separated)" className="px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" />
                  <input name="videoUrl" value={lesson.videoUrl} onChange={e => handleLessonChange(idx, e)} placeholder="Video URL (or upload below)" className="px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" required />
                  <input type="file" accept="video/*" onChange={e => handleVideoUpload(idx, e.target.files[0])} className="px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" required={!lesson.videoUrl} />
                  {lesson.videoUrl && (
                    <video src={lesson.videoUrl} controls className="w-full h-32 rounded mt-2" />
                  )}
                </div>
                <textarea name="description" value={lesson.description} onChange={e => handleLessonChange(idx, e)} placeholder="Lesson Description" className="w-full px-2 py-1 rounded border focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 mb-2" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => removeLesson(idx)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Remove</button>
                  {idx === form.lessons.length - 1 && (
                    <button type="button" onClick={addLesson} className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600">Add Lesson</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button type="submit" disabled={submitting} className="px-6 py-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition shadow">{submitting ? "Uploading..." : "Upload Course"}</button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </form>
        <h2 className="text-xl font-bold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400 dark:text-gray-500 text-lg font-semibold">No courses available.</div>
          ) : (
            courses.map(course => (
              <a key={course._id} href={`/course/${course._id}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer">
                <div>
                  <div className="font-bold text-lg mb-1">{course.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{course.category}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">{course.description}</div>
                </div>
                <button type="button" onClick={e => { e.preventDefault(); handleDelete(course._id); }} className="mt-2 px-4 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
