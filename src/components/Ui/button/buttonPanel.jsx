import classes from "./button.module.css";

export const ButtonPanel = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${classes.button} ${classes.buttonPanel} ${classes.buttonClick}`}
    >
      {children}
    </button>
  );
};
