import styles from "./App.module.css"

function App() {
  return (
    <>
      <div className={styles.nav}>Nav</div>
      <div className={styles.header}>
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          Watch
        </Button>
        <Space />
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          Fork <div className={styles.circle}>5</div>
        </Button>
        <Space />
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          Star
        </Button>
      </div>
      <div className={styles.listContainer}>
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
      <div className={styles.footer}>Footer</div>
    </>
  )
}

function Button({ style, children }) {
  return (
    <button className={styles.button} style={style}>
      {children}
    </button>
  )
}

function Space() {
  return <div className={styles.space}></div>
}

export default App
