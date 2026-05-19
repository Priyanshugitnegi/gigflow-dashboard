import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const token = localStorage.getItem("token");

  const fetchLeads = async () => {

    try {

      const response = await API.get("/leads/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const createLead = async () => {

    try {

      await API.post(
        "/leads/",
        {
          name,
          email,
          company,
          status: "New",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();

      setName("");
      setEmail("");
      setCompany("");

    } catch (error) {
      console.log(error);
    }
  };
  const deleteLead = async (id) => {

  try {

    await API.delete(`/leads/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchLeads();

  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (id, newStatus) => {

  try {

    const lead = leads.find((l) => l.id === id);

    await API.put(
      `/leads/${id}/`,
      {
        ...lead,
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchLeads();

  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            GigFlow Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Create Lead
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={createLead}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Lead
          </button>

        </div>

        <div>
            <input
  type="text"
  placeholder="Search leads..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border p-3 rounded-lg mb-6 w-full"
/>

          <h2 className="text-2xl font-semibold mb-4">
            All Leads
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {leads
  .filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((lead) => (

              <div
                key={lead.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lead.name}
                </h3>

                <p className="text-gray-600 mb-1">
                  {lead.email}
                </p>

                <p className="text-gray-600 mb-3">
                  {lead.company}
                </p>

                <select
  value={lead.status}
  onChange={(e) =>
    updateStatus(lead.id, e.target.value)
  }
  className="border p-2 rounded-lg"
>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Qualified">Qualified</option>
  <option value="Closed">Closed</option>
</select>

                <button
  onClick={() => deleteLead(lead.id)}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Delete
</button>



              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;