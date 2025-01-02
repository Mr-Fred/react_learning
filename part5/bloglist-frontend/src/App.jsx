import { useEffect, useRef } from "react";
// Ui Components
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import Creators from "./components/Creators";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Creator from "./components/Creator";

// redux;
import { useSelector } from "react-redux";

// Routes
import { Routes, Route, Navigate, useMatch } from "react-router";

// Services and features
import { useFetchBlogs } from "./features/useBlogs";
import { useFetchCreators } from "./features/useCreators";
import { setUserData, clearUserData, setHeader } from "./reducers/userReducers";
import { useShowNotification } from "./reducers/notifReducers";
import { useDispatch } from "react-redux";



const App = () => {
  const dispatch = useDispatch();
  const creatorMatch = useMatch('/creators/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUserData(user));
      dispatch(setHeader(user.token));
    } else {
      dispatch(clearUserData());
      dispatch(setHeader(null))
    }
  }, []);
  const {user, token} = useSelector((state) => state.user);
  const { data: blogs, isLoading: blogsIsLoading, isError: blogsIsError, error } = useFetchBlogs(token);
  const { data: creators, isLoading: creatorsIsLoading, isError: creatorsIsError } = useFetchCreators();
  const notification = useSelector((state) => state.notification);
  const blogFormRef = useRef();

  if(!user) {
    return(
      <div>
        <Notification />
        <h2 className="bg-white font-bold text-2xl p-6 rounded shadow-md">Log in to application</h2>
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      </div>
    )
  }

  if (blogsIsLoading) {
    return (
      <div>
        <span>Loading blogs...</span>
      </div>
    );
  }

  if (blogsIsError) {
    return (
      <div style={{ color: "red" }}>
        <p>Error fetching blogs: {error.message}</p>
      </div>
    );
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUserData());
    dispatch(setHeader(null))
    dispatch(useShowNotification("You have successfully logged out", "success"));
  };

  const creator = creatorMatch
    ? creators.find(c => c.id === creatorMatch.params.id)
    : null
  
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs" element={blogs?<BlogList blogs={blogs}/>: null }/>
        <Route path="/new" element={<BlogForm />} />
        <Route path="/creators" element={user 
          ? <Creators
              creators={creators} 
              isLoading={creatorsIsLoading}
              isError={creatorsIsError}/>
          : <Navigate replace to="/login" />} 
        />
        <Route path="/creators/:id" 
          element={<Creator creator={creator} blogs={blogs}/>} 
        />
        <Route path="/blogs/:id" element={<Blog blog={blog} token={token}/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;