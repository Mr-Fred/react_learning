import {Routes, Route, Link} from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Home from "./components/Home";

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/add">add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>

      <div>
      </div>
    </div>
  );
};

export default App;
