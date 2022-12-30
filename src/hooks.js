import { useState } from "react"

export function useForm({
  initialValues,
  validate,
  refs,
  onSuccess, // 성공했을때 어떤걸 할 것 ?
  onErrors, // 에러시에 어떻게 할 것?
  onSubmit, // 값이 전달 될 때는 어떤 함수/네트워크를 호출?
}) {
  const [inputValues, setInputValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setIsSubmitting(true)
    const validateResult = validate(inputValues)
    setErrors(validateResult)

    const errorKeys = Object.keys(validateResult)

    if (errorKeys.length !== 0) {
      const key = errorKeys[0]
      alert(validateResult[key])
      refs[key].current.focus()
      // ref control
      setIsSubmitting(false)
      return
    }

    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit()
        onSuccess(result)
      } catch (e) {
        console.log({ e })
        onErrors()
      }
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
