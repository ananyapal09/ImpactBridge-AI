import { useEffect, useState } from "react";
import { getAllUsers } from "../services/adminService";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const token = localStorage.getItem("token");

    const data = await getAllUsers(token);

    setUsers(data.users);
  };

  return (
    <div className="min-h-screen bg-[#14201B] text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        User Management
      </h1>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-[#1B2A24] rounded-xl p-5 flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold">
                {user.name}
              </h2>

              <p className="text-gray-400">
                {user.email}
              </p>

            </div>

            <div className="flex gap-4">

              <span className="bg-yellow-500 px-3 py-1 rounded-full text-black">
                {user.role}
              </span>

              <span
                className={
                  user.isVerified
                    ? "bg-green-600 px-3 py-1 rounded-full"
                    : "bg-red-600 px-3 py-1 rounded-full"
                }
              >
                {user.isVerified
                  ? "Verified"
                  : "Pending"}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}