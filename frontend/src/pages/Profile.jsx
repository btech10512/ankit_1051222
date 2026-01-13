import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Profile() {
  const { logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    api.get("/user").then(res =>
      setForm({ ...res.data, password: "" })
    );
  }, []);

  const updateProfile = async () => {
    await api.put("/user", form);
    alert("Profile updated");
    setForm({ ...form, password: "" });
  };

  const deleteProfile = async () => {
    await api.delete("/user");
    logout();
  };

  return (
    <div className="container">
      <h2>Profile</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={updateProfile}>Update Profile</button>
      <button onClick={deleteProfile}>Delete Account</button>
    </div>
  );
}
