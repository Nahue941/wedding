function PolaroidCard({ imageSrc, imageAlt, caption, className = "", index }) {
  return (
    <article
      className={`storyPolaroids__polaroid ${className}`.trim()}
      data-polaroid-index={index}
    >
      <div className="storyPolaroids__frame">
        <img src={imageSrc} alt={imageAlt} className="storyPolaroids__image" />
      </div>
      <p className="storyPolaroids__caption">{caption}</p>
    </article>
  );
}

export default PolaroidCard;
