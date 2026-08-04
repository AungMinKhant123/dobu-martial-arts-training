import { getFeaturedBlogs } from "../blog/blog.service.js";
import { getFeaturedClasses } from "../class/class.service.js";
import { getFeaturedInstructors } from "../instructor/instructor.service.js";

export const getHomeData = async () => {
  const [classes, blogs, instructors] = await Promise.all([
    getFeaturedClasses(),
    getFeaturedBlogs(),
    getFeaturedInstructors(),
  ]);
  return { classes, blogs, instructors };
};
