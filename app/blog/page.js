// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";
import axios from "axios";

async function getBlogs() {
  try {
    const res = await axios.get(`https://dev.to/api/articles?username=${personalData.devUsername}`);
    
    if (res.status !== 200) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = res.data;

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return []; // Return an empty array instead of failing completely
  }
}



async function page() {
  const blogs = await getBlogs();
  console.log("Blogs fetched:", blogs);
  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            <BlogCard blog={{ ...blog, cover_image: blog.cover_image || blog.social_image }} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;