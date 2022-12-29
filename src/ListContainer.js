import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import cx from "clsx"

import Button from "./components/Button"
import ListItem from "./components/ListItem"
import ListFilter from "./components/ListFilter"
import ListItemLayout from "./components/ListItemLayout"
import Pagenation from "./components/Pagenation"
import { GITHUB_API } from "./api"

import styles from "./ListContainer.module.css"

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open")
  const [list, setList] = useState([])
  const [checked, setChecked] = useState(false)
  const [params, setParams] = useState()
  const maxPage = 10

  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get("page"), 10)
  const mode = searchParams.get("mode")

  async function getData(params) {
    const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
      params,
    })
    setList(data.data)
  }

  useEffect(() => {
    getData({ page, state: mode, ...params })
  }, [page, mode, params])

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
        <OpenClosedFilters isOpenMode={mode !=='closed'} OnClickMode={(mode) => setSearchParams({ mode })} />
        <ListItemLayout className={styles.listFilter}>
          <ListFilter
            onChangeFilter={(params) => {
              // 필터링된 요소에 맞게 데이터를 불러오기
              // const data = getData('필터링 된 정보')
              // setList(data)
              setParams(params)
            }}
          />
        </ListItemLayout>
        {list.map((item) => (
          <ListItem
            key={item.id}
            data={item}
            checked={checked}
            onClickCheckBox={() => setChecked((checked) => !checked)}
          />
        ))}
      </div>
      <div className={styles.pagenationContainer}>
        <Pagenation
          maxPage={maxPage}
          currentPage={page}
          onClickPageButton={(pageNumber) =>
            setSearchParams({ page: pageNumber })
          }
        />
      </div>
    </>
  )
}

function OpenClosedFilters({ isOpenMode, OnClickMode }) {
  // const data = getData()
  // const openedData = data.filter((d)=> d.state === 'open');
  // const closedData = data.filter((d)=> d.state === 'closed');
  // const openModeDataSize = 1
  // const closeModeDataSize = 2
  return (
    <>
      <OpenClosedFilter
        // size={openModeDataSize}
        state="Opened"
        selected={isOpenMode}
        onClick={() => OnClickMode('open')}
      />
      <OpenClosedFilter
        // size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => OnClickMode('closed')}
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
