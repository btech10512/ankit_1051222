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

//   return (
//     <div className="container">
//       <h2>Profile</h2>

//       <input
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) =>
//           setForm({ ...form, name: e.target.value })
//         }
//       />

//       <input
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder="New Password"
//         value={form.password}
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />

//       <button onClick={updateProfile}>Update Profile</button>
//       <button onClick={deleteProfile}>Delete Account</button>
//     </div>
//   );
    return (
    <div className="kb-wrapper">
      <div className="kb-container prof-center">
        <div className="prof-card">
          <div className="prof-header">
            <h1 className="prof-title">Account Settings</h1>
            <p className="prof-subtitle">Manage your profile information and security.</p>
          </div>

          <div className="prof-form-section">
            <div className="prof-input-group">
              <label>Full Name</label>
              <input
                className="prof-input"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="prof-input-group">
              <label>Email Address</label>
              <input
                className="prof-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="prof-input-group">
              <label>New Password</label>
              <input
                className="prof-input"
                type="password"
                placeholder="Leave blank to keep current"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="prof-btn-primary" onClick={updateProfile}>
              Save Changes
            </button>
          </div>

          <div className="prof-danger-zone">
            <div className="danger-text">
              <h4>Delete Account</h4>
              <p>Permanently remove your account and all tasks. This action is irreversible.</p>
            </div>
            <button className="prof-btn-danger" onClick={deleteProfile}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
