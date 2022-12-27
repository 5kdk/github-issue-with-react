import { useState } from "react"
import Modal from "./Modal"

import styles from "./ListFilter.module.css"

export default function ListFilter() {
  const [showModal, setShowModal] = useState()
  const filterList = [
    "Author",
    "Lable",
    "Projects",
    "Milestones",
    "Assignee",
    "Sort",
  ]

  return (
    <div className={styles.filterLists}>
      {filterList.map((filter) => (
        <ListFilterItem
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
}) {
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
          searchDataList={["bug", "labels", "new", "apple"]}
          onClickCell={() => {
            // 클릭된 정보를 통해 리스트 필터링
            onChangeFilter()
          }}
        />
      </div>
    </div>
  )
}
