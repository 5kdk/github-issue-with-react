import { Route, Routes } from "react-router-dom"

import Issue from './pages/Issue'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Issue/>} />
      <Route path="/example" element={<Example/>} />
    </Routes>
  )
}

export default App


function Example() {
  return <div>example</div>
}
