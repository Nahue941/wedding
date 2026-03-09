import Hero from "@components/Hero/Hero";
import StoryPolaroids from "@components/StoryPolaroids";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="relative">
      <div className="transition-all opacity-100 scale-100">
        <div className="snap-y snap-mandatory">
          <Hero opened />
          <StoryPolaroids />
          <Hero opened />
        </div>
      </div>
    </div>
  );
}
