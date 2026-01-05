import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { useLoader } from "../../contexts/LoaderContext";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const { setLoading } = useLoader();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/admin/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 Search filter (frontend only)
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Block/Unblock
  const handleBlock = async (id) => {
    try {
      setLoading(true);
      await instance.put(`/admin/users/block/${id}`, {}, { withCredentials: true });
      toast.success("User block status updated");
      fetchUsers(); // refresh list
    } catch (err) {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete with toast confirmation
  const handleDelete = (user) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete <b>{user.name}</b>?</p>
        <div style={{ marginTop: "10px" }}>
          <button
            style={{
              marginRight: "8px",
              padding: "5px 10px",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={async () => {
              toast.dismiss();
              try {
                setLoading(true);
                await instance.delete(`/admin/users/${user._id}`, { withCredentials: true });
                toast.success("User deleted successfully");
                fetchUsers();
              } catch (err) {
                toast.error("Failed to delete user");
              } finally {
                setLoading(false);
              }
            }}
          >
            Yes
          </button>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#ccc",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="admin-users">
      <h1>User List</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="user-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={user.isBlocked ? "blocked-user" : ""}>
                <td>{index + 1}</td>
                <td>{user.name || user.username}</td>
                <td>{user.email}</td>

                {/* 🎭 Role badge */}
                <td>
                  <span className={user.role === "admin" ? "role admin" : "role user"}>
                    {user.role}
                  </span>
                </td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                {/* ⚙️ Actions */}
                <td className="actions">
                  <button
                    className={user.isBlocked ? "unblock-btn" : "block-btn"}
                    onClick={() => handleBlock(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
