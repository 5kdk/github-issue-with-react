import { useState, useEffect } from "react"
import axios from "axios"

import Modal from "./Modal"
import styles from "./ListFilter.module.css"
import { GITHUB_API } from "../api"

export default function ListFilter() {
  const [showModal, setShowModal] = useState()
  const [list, setList] = useState([])
  const filterList = [
    // "Author",
    "Label",
    // "Projects",
    "Milestone",
    "Assignee",
    // "Sort",
  ]

  async function getData(apiPath) {
    const data = await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`,
    )

    let result = []
    switch (apiPath) {
      case "assignes":
        result = data.data.map((d) => ({
          name: d.login,
        }))
        break
      case "milestone":
        result = data.data.map((d) => ({
          name: d.title,
        }))
        break
      case "label":
      default:
        result = data.data
    }

    // 데이터 가공 name, title, login -> name
    setList(result)
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`
      getData(apiPath)
    }
  }, [showModal])

  return (
    <div className={styles.filterLists}>
      {filterList.map((filter) => (
        <ListFilterItem
          searchDataList={list}
          key={filter}
          onClick={() => setShowModal(filter)}
          onClose={() => setShowModal()}
          showModal={showModal === filter}
        >
          {filter}
        </ListFilterItem>
      ))}
    </div>
  )
}

function ListFilterItem({
  children,
  onChangeFilter,
  showModal,
  onClick,
  onClose,
  searchDataList
}) {
  const [list, setList] = useState(searchDataList)

  useEffect(() => {
    setList(searchDataList)
  }, [searchDataList])
  

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children} ▾
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder="Filter lables"
          searchDataList={list}
          onClickCell={() => {
            // 클릭된 정보를 통해 리스트 필터링
            onChangeFilter()
          }}
        />
      </div>
    </div>
  )
}
