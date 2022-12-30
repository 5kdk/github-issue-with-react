import { useState } from "react"

export function useForm({
  initialValues,
  validate,
  refs,
  onSuccess, // 성공했을때
  onErrors, // 에러시에 
  onSubmit, // 값이 전달 될 때는 어떤 함수
}) {
  const [inputValues, setInputValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubitting] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    setIsSubitting(true)
    const validateResult = validate(inputValues)
    setErrors(validateResult)

    const errorKeys = Object.keys(validateResult)

    if (errorKeys.length !== 0) {
      const key = errorKeys[0]
      alert(validateResult[key])
      onErrors()
      // refs[key].current.focus()
      setIsSubitting(false)
      return
    }

    if (errorKeys.length === 0) {
      onSubmit()
      return
    }
  }
  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  }
}
