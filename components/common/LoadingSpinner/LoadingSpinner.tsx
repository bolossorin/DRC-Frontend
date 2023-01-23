import React from "react";

// assets
import styles from './LoadingSpinner.module.scss'

export const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.indicator}></div>
    </div>
  )
}