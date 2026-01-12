// import React, { useEffect, useState } from "react";
// import instance from "../../axiosConfig";
// import { useLoader } from "../../contexts/LoaderContext";
// import { toast } from "react-toastify";

// const AdminUsers = () => {
//   const { setLoading } = useLoader();

//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   /* ================= FETCH USERS ================= */
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await instance.get("/admin/users", {
//         withCredentials: true,
//       });
//       setUsers(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   /* ================= SEARCH ================= */
//   const filteredUsers = users.filter(
//     (u) =>
//       u.name?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ================= BLOCK / UNBLOCK ================= */
//   const handleBlock = async (id) => {
//     try {
//       setLoading(true);
//       await instance.put(`/admin/users/block/${id}`, {}, { withCredentials: true });
//       toast.success("User status updated");
//       fetchUsers();
//     } catch (err) {
//       toast.error("Failed to update user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = (user) => {
//     toast.info(
//       <div className="space-y-3">
//         <p className="text-sm">
//           Are you sure you want to delete{" "}
//           <b className="text-red-600">{user.name || user.username}</b>?
//         </p>

//         <div className="flex gap-3 justify-end">
//           <button
//             className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
//             onClick={async () => {
//               toast.dismiss();
//               try {
//                 setLoading(true);
//                 await instance.delete(`/admin/users/${user._id}`, {
//                   withCredentials: true,
//                 });
//                 toast.success("User deleted successfully");
//                 fetchUsers();
//               } catch (err) {
//                 toast.error("Failed to delete user");
//               } finally {
//                 setLoading(false);
//               }
//             }}
//           >
//             Yes
//           </button>

//           <button
//             className="px-3 py-1.5 text-sm bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//             onClick={() => toast.dismiss()}
//           >
//             No
//           </button>
//         </div>
//       </div>,
//       {
//         autoClose: false,
//         closeOnClick: false,
//         closeButton: false,
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">

//         {/* TITLE */}
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           User Management
//         </h1>

//         {/* SEARCH */}
//         <div className="mb-4 flex justify-end">
//           <input
//             type="text"
//             placeholder="Search by name or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full sm:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* TABLE */}
//         {filteredUsers.length === 0 ? (
//           <p className="text-center text-gray-500 py-10">No users found</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredUsers.map((user, index) => (
//                   <tr
//                     key={user._id}
//                     className={`border-t ${
//                       user.isBlocked ? "bg-red-50" : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-4 py-3 text-sm">{index + 1}</td>
//                     <td className="px-4 py-3 text-sm font-medium">
//                       {user.name || user.username}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {user.email}
//                     </td>

//                     {/* ROLE */}
//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                           user.role === "admin"
//                             ? "bg-red-100 text-red-600"
//                             : "bg-blue-100 text-blue-600"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>

//                     {/* ACTIONS */}
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleBlock(user._id)}
//                           className={`px-3 py-1.5 text-xs font-semibold rounded-md text-white ${
//                             user.isBlocked
//                               ? "bg-green-500 hover:bg-green-600"
//                               : "bg-yellow-500 hover:bg-yellow-600"
//                           }`}
//                         >
//                           {user.isBlocked ? "Unblock" : "Block"}
//                         </button>

//                         <button
//                           onClick={() => handleDelete(user)}
//                           className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-500 text-white hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;




import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { useLoader } from "../../contexts/LoaderContext";
import { toast } from "react-toastify";

const formatDate = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  return isNaN(d) ? "—" : d.toLocaleDateString("en-GB");
};

export default function AdminUsers() {
  const { setLoading } = useLoader();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/admin/users", { withCredentials: true });
      setUsers(res.data || []);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= FILTER ================= */
  const admins = users.filter((u) => u.role === "admin");
  const usersList = users.filter(
    (u) =>
      u.role === "user" &&
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  /* ================= ACTIONS ================= */
  const handleBlock = async (id) => {
    setLoading(true);
    try {
      await instance.put(`/admin/users/block/${id}`, {}, { withCredentials: true });
      toast.success("User status updated");
      fetchUsers();
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    setLoading(true);
    try {
      await instance.delete(`/admin/users/${id}`, { withCredentials: true });
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TABLE ================= */
  const Table = ({ data, isUser }) => (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">#</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Role</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Joined</th>
            {isUser && (
              <th className="px-6 py-4 text-center font-semibold text-gray-700">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={isUser ? 6 : 5}
                className="py-10 text-center text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((user, i) => (
              <tr
                key={user._id}
                className={`border-t transition ${
                  user.isBlocked ? "bg-red-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-5 align-middle">{i + 1}</td>

                <td className="px-6 py-5 font-medium align-middle">
                  {user.name || user.username}
                </td>

                <td className="px-6 py-5 text-gray-600 align-middle">
                  {user.email}
                </td>

                <td className="px-6 py-5 align-middle">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5 text-gray-600 align-middle">
                  {formatDate(user.createdAt)}
                </td>

                {isUser && (
                  <td className="px-6 py-5 align-middle">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleBlock(user._id)}
                        className={`min-w-[90px] px-4 py-2 text-xs font-semibold rounded-full text-white shadow ${
                          user.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="min-w-[90px] px-4 py-2 text-xs font-semibold rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ADMINS */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Admins</h2>
          <Table data={admins} isUser={false} />
        </section>

        {/* USERS */}
        <section className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-xl font-bold">Users</h2>

            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-3 sm:mt-0 w-full sm:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <Table data={usersList} isUser />
        </section>
      </div>
    </div>
  );
}
