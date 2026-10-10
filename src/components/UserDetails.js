import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    setUser(null);
    setError("");

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load this profile.");
        }
        return response.json();
      })
      .then((data) => {
        if (isCurrent) {
          setUser(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError("Unable to load this profile. Please try again.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  if (error) {
    return (
      <section className="profile-view">
        <Link className="back-link" to="/">← All users</Link>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  if (!user) {
    return <div className="status-message">Loading...</div>;
  }

  return (
    <section className="profile-view">
      <Link className="back-link" to="/">← All users</Link>
      <p className="eyebrow">Profile / {String(user.id).padStart(2, "0")}</p>
      <h1>{user.name}</h1>
      <div className="profile-details">
        <p><span>Name:</span> {user.name}</p>
        <p><span>Username:</span> {user.username}</p>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Phone:</span> {user.phone}</p>
        <p><span>Website:</span> {user.website}</p>
      </div>
    </section>
  );
};

export default UserDetails;