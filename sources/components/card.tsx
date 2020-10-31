import React from "react";
import styles from "./card.less";

export const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
