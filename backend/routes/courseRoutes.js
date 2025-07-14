import express from 'express';
import { getAllCourses, getCourseById , createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import protect from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';

const router = express.Router();


router.get('/', protect, getAllCourses);
router.get('/:id', protect, getCourseById);

// Protected only for admin

router.post("/admin", protect, adminOnly, createCourse);
router.put("/admin/:id", protect, adminOnly, updateCourse);
router.delete("/admin/:id", protect, adminOnly, deleteCourse);

export default router;