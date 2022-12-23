import styles from './Modal.module.css'
import cx from 'clsx'

export default function Modal({ opened, title, onClose }) {
  return (
    <div className={cx(styles.modal, {[styles.opened]: opened})}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  )
}

// portal