import classes from "./indicators.module.css";

export const PreLoader = () => {
  return (
    <section className={classes.preloader}>
      <div className={classes.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
