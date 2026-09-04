import { useEffect, useState } from "react";
import "../../styles/admin.css";

function Users() {
  const emptyUser = {
    name: "",
    email: "",
    phone: ""
  };

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyUser);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(savedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value
    }));
  };

  const resetForm = () => {
    setUser(emptyUser);
    setEditId(null);
  };

  const submit = (e) => {
    e.preventDefault();

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.phone.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(user.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    if (editId !== null) {
      const updatedUsers = users.map((existingUser) =>
        existingUser.id === editId
          ? {
              ...existingUser,
              ...user
            }
          : existingUser
      );

      setUsers(updatedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      alert("User updated successfully");

      resetForm();

      return;
    }

    const emailExists = users.some(
      (existingUser) =>
        existingUser.email.toLowerCase() ===
        user.email.toLowerCase()
    );

    if (emailExists) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...user
    };

    const updatedUsers = [
      ...users,
      newUser
    ];

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert("User added successfully");

    resetForm();
  };

  const editUser = (selectedUser) => {
    setUser({
      name: selectedUser.name || "",
      email: selectedUser.email || "",
      phone: selectedUser.phone || ""
    });

    setEditId(selectedUser.id);
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    const updatedUsers = users.filter(
      (existingUser) =>
        existingUser.id !== id
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    if (editId === id) {
      resetForm();
    }

    alert("User deleted successfully");
  };

  return (
    <div className="users-page">

      <div className="users-container">

        <p className="users-brand">
          GAMEZONE
        </p>

        <h1>
          Manage Users
        </h1>

        <form
          className="user-form"
          onSubmit={submit}
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
          />

          <button type="submit">
            {editId !== null
              ? "Update User"
              : "Add User"}
          </button>

          {editId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

        </form>

        <div className="users-table">

          {users.length === 0 ? (

            <div className="no-users">
              <h3>
                No Users Found
              </h3>

              <p>
                Registered users will appear here.
              </p>
            </div>

          ) : (

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {users.map((existingUser) => (

                  <tr
                    key={existingUser.id}
                  >

                    <td>
                      {existingUser.id}
                    </td>

                    <td>
                      {existingUser.name}
                    </td>

                    <td>
                      {existingUser.email}
                    </td>

                    <td>
                      {existingUser.phone}
                    </td>

                    <td>

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          editUser(
                            existingUser
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          deleteUser(
                            existingUser.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default Users;