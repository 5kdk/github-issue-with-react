import { useState, useRef } from "react"
import cx from "clsx"

import Button from "../components/Button"
import styles from "./CreateIssue.module.css"
import TextField from "../components/TextField"

export default function CreateIssue() {
  const inputRef = useRef()
  const textareaRef = useRef()

  const [inputValues, setInputValues] = useState({ title: "", body: "" })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    setIsSubitting(true)
    const refs = { title: inputRef, body: textareaRef }
    const validateResult = validate(inputValues)
    setErrors(validateResult)

    const errorKeys = Object.keys(validateResult)

    if (errorKeys.length !== 0) {
      const key = errorKeys[0]
      alert(validateResult[key])
      refs[key].current.focus()
      setIsSubitting(false)
      return
    }

    if (errorKeys.length === 0) {
      console.log("Submit 성공")
    }
  }
  function onChange(e) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <TextField
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={inputValues.title}
            onChange={onChange}
            error={errors.title}
          />
          <TextField
            ret={textareaRef}
            type="textarea"
            name="body"
            placeholder="Leave a comment"
            value={inputValues.body}
            onChange={onChange}
            error={errors.body}
          />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              style={{
                fontSize: "14px",
                backgroundColor: "#347d39",
                color: "white",
              }}
              disabled={isSubmitting}
            >
              Submit New Issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function validate(values) {
  let error = {}
  if (values.title === "") {
    error = { title: "타이틀은 필수값입니다." }
  }
  return error
}
