import styles from "./ListContainer.module.css"
import Button from "./components/Button"
import { useState } from "react"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")

  return (
    <div className={styles.listContainer}>
      <div className={styles.topSection}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "#347d39",
            color: "white",
          }}
        >
          New Issue
        </Button>
      </div>
    </div>
  )
}