import classes from "./inputCity.module.css";

export const InputCity = ({ ...props }) => {
  return <input {...props} className={classes.inputSearch} required />;
};
