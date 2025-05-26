import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import axios from "axios";

async function getData() {
  try {
    const res = await axios.get(`https://dev.to/api/articles?username=${personalData.devUsername}`);
    
    if (res.status !== 200) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = res.data;

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }

    const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

    return filtered;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return []; // Return an empty array instead of failing completely
  }
}


export default async function Home() {
  const blogs = await getData();

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};