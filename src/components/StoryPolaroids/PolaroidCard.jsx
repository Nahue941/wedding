function PolaroidCard({ imageSrc, imageAlt, caption, date, index }) {
  return (
    <article className="card" data-polaroid-index={index}>
      <div className="img-wrapper">
        <img src={imageSrc} alt={imageAlt} className="story-polaroid-image" />
        <span className="img-reveal-layer" aria-hidden="true" />
      </div>
      <div className="card-content">
        <h1>{caption}</h1>
        <p>{date}</p>
      </div>
    </article>
  );
}

export default PolaroidCard;
