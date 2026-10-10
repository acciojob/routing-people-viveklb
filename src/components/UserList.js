import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load users.");
        }
        return response.json();
      })
      .then((data) => {
        if (isCurrent) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError("Unable to load users. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="directory-view">
      <p className="eyebrow">Directory / 01</p>
      <h1>User List</h1>
      <p className="intro">Select a person to view their contact details.</p>
      {loading && <div className="status-message">Loading...</div>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <ol className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <span className="user-number">{String(user.id).padStart(2, "0")}</span>
                <span>{user.name}</span>
                <span className="user-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default UserList;