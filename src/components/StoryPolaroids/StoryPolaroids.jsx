import PolaroidCard from "./PolaroidCard";
import "./StoryPolaroids.css";

const POLAROID_ITEMS = [
  {
    id: "1",
    imageSrc:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 1",
    caption: "Sample",
  },
  {
    id: "2",
    imageSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 2",
    caption: "Sample",
  },
  {
    id: "3",
    imageSrc:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 3",
    caption: "Sample",
  },
  {
    id: "4",
    imageSrc:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sample 4",
    caption: "Sample",
  },
];

function StoryPolaroids() {
  return (
    <section className="storyPolaroids">
      <div className="storyPolaroids__inner">
        <div className="storyPolaroids__stack">
          {POLAROID_ITEMS.map((item, index) => (
            <PolaroidCard
              key={item.id}
              className="storyPolaroids__card"
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              caption={item.caption}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoryPolaroids;
