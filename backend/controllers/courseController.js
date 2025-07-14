import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createCourse = async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    category,
    lessons,
  } = req.body;

  try {
    // Basic validation (optional, can be extended)
    if (!title || !description || !price || !thumbnail || !lessons || !Array.isArray(lessons)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const filteredLessons = lessons.filter(lesson => lesson.videoUrl && lesson.videoUrl.trim() !== "");
    if (filteredLessons.length !== lessons.length) {
      return res.status(400).json({ message: "Each lesson must have a video uploaded." });
    }
    const newCourse = new Course({
      title,
      description,
      price,
      thumbnail,
      category,
      lessons: filteredLessons.map(lesson => ({
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        description: lesson.description,
        resourceLinks: lesson.resourceLinks,
      })),
      createdBy: req.user && req.user._id ? [req.user._id] : [],
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, category, lessons } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, {
            title,
            description,
            price,
            thumbnail,
            category,
            lessons
        }, { new: true });  
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(updatedCourse);
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteCourse = async (req,res) => {
    const {id} = req.params;
    try {
        const deleteCourse = await Course.findByIdAndDelete(id);
        if (!deleteCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}