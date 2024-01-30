"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Gallery from "../components/Body/Gallery";

function HomePage() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <>
      <Gallery></Gallery>
    </>
  );
}

export default HomePage;
