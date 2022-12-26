import cx from "clsx"
import Button from "./components/Button"
import ListItem from "./components/ListItem"
import ListFilter from "./components/ListFilter"

import { useState } from "react"
import ListItemLayout from "./components/ListItemLayout"

import styles from "./ListContainer.module.css"
import Pagenation from "./components/Pagenation"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)

  return (
    <>
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
          <ListFilter
            onChangeFilter={(filteredData) => {
              // 필터링된 요소에 맞게 데이터를 불러오기
              // const data = getData('필터링 된 정보')
              // setList(data)
            }}
          />
        </ListItemLayout>
        <div className={styles.container}>
          {list.map((listItem, index) => (
            <ListItem
              key={index}
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
          ))}
        </div>
      </div>
      <div className={styles.pagenationContainer}>
        <Pagenation
          maxPage={10}
          currentPage={page}
          onClickPageButton={(number) => setPage(number)}
        />
      </div>
    </>
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
