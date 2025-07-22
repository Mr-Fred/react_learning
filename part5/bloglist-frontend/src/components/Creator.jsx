import {Link} from 'react-router';
const Creator = ({ creator, blogs }) => {
  const creatorBlogs = blogs.filter((blog) => blog.creator.id === creator.id);

  if (!creator) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{creator.name}</h2>
      <h3>Added blogs</h3>
      <ul className="list-disc pl-4">
        {creatorBlogs.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Creator;