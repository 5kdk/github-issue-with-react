import cx from "clsx"
import Button from "./components/Button"
import ListItem from "./components/ListItem"
import Modal from "./components/Modal"

import { useState } from "react"
import ListItemLayout from "./components/ListItemLayout"

import styles from "./ListContainer.module.css"

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
      <OpenClosedFilters />
      <ListItemLayout className={styles.listFilter}>
        <ListFilter />
      </ListItemLayout>
      <div className={styles.container}>
        <ListItem
          badges={[
            {
              color: "red",
              title: "Bug",
            },
            {
              color: "blue",
              title: "New",
            },
          ]}
        />
      </div>
    </div>
  )
}

function ListFilter() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.filterLists}>
        <ListFilterItem onClick={() => setShowModal(true)}>Author</ListFilterItem>
        <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignee</ListFilterItem>
        <ListFilterItem>Sort</ListFilterItem>
      </div>
      <Modal opened={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

function ListFilterItem({ onClick, children }) {
  return (
    <span role="button" onClick={onClick}>
      {children} ▾
    </span>
  )
}

function OpenClosedFilters() {
  const [isOpenMode, setIsOpenMode] = useState(true)
  // const data = getData()
  // const openedData = data.filter((d)=> d.state === 'open');
  // const closedData = data.filter((d)=> d.state === 'closed');
  const openModeDataSize = 1
  const closeModeDataSize = 2
  return (
    <>
      <OpenClosedFilter
        size={openModeDataSize}
        state="Opened"
        selected={isOpenMode}
        onClick={() => setIsOpenMode(true)}
      />
      <OpenClosedFilter
        size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => setIsOpenMode(false)}
      />
    </>
  )
}

function OpenClosedFilter({ size, state, onClick, selected }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  )
}
