import { BrowserRouter,Routes , Route } from "react-router-dom"
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { FullBlogPost } from "./comonents/FullBlogPost"

export function App() {
  
  return(<>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog"  element={<Blog />} />
          <Route path="/blog/:blogId" element={<FullBlogPost/>} />
        </Routes>
      </BrowserRouter>
  </>)
}