import styles from "./StoryPolaroids.module.css";

function PolaroidCard({ imageSrc, imageAlt, caption, date, index }) {
  return (
    <article className={styles.card} data-polaroid-index={index}>
      <div className={styles.imgWrapper}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={styles.image}
          data-polaroid-image
        />
        <span
          className={styles.revealLayer}
          aria-hidden="true"
          data-polaroid-reveal
        />
      </div>
      <div className={styles.cardContent}>
        <h1>{caption}</h1>
        {date ? <p>{date}</p> : null}
      </div>
    </article>
  );
}

export default PolaroidCard;
