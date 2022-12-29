import { useState } from "react"
import { useLocation, Link } from "react-router-dom"

import styles from "./Tabs.module.css"
import cx from "clsx"

const tabList = [
  { name: "Code", pathname: "/code" },
  { name: "Issue", pathname: "/issue" },
  { name: "Pull request", pathname: "/pulls" },
  { name: "Actions", pathname: "/actions" },
  { name: "Projects", pathname: "/projects" },
  { name: "Security", pathname: "/security" },
]

export default function Tabs() {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0)
  const {pathname} = useLocation();

  return (
    <ul className={styles.tabList}>
      {tabList.map((tab, idx) => (
        <Tab
          key={`${idx}`}
          item={tab}
          selected={pathname === tab.pathname}
          onClick={() => setSelectedTabIdx(idx)}
        />
      ))}
    </ul>
  )
}

function Tab({ item, selected, onClick, number }) {
  return (
    <li>
      <Link to={item.pathname } className={styles.link}>
      <button
        onClick={onClick}
        className={cx(styles.tab, { [styles.selected]: selected })}
      >
        <span>{item.name}</span>
        {number && <div className={styles.circle}>{number}</div>}
        </button>
        </Link>
    </li>
  )
}
