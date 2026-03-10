import Hero from "@components/Hero/Hero";
import StoryPolaroids from "@components/StoryPolaroids";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return <StoryPolaroids />;
}

{
  /* <Hero opened /> */
}
{
  /* <Hero opened />  */
}
