import classes from "./button.module.css";

export const ButtonSide = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${classes.button} ${classes.buttonTop} ${classes.buttonClick}`}
    >
      {children}
    </button>
  );
};
