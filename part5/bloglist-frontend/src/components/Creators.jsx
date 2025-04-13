import { useFetchCreators } from "../features/useCreators";
import { Link, useNavigate } from "react-router";

const Creators = ({ creators, isLoading, isError }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="text-gray-500">Loading creators...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching creators</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Creators</h2>
      <table className="table-auto w-full border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {creators?.map((item) => (
            <tr key={item.name} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">
                <Link to={`/creators/${item.id}`} className="text-blue-500 hover:underline">
                  {item.name}
                </Link>
              </td>
              <td className="px-4 py-2">{item.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Creators;