import { useEffect, useState } from "react";
import api from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      await api.put(`/requests/accept/${id}`);
      alert("Request accepted");
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to accept request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await api.put(`/requests/reject/${id}`);
      alert("Request rejected");
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reject request");
    }
  };

  return (
    <div>
      <h2>Borrow Requests</h2>

      {requests.length === 0 ? (
        <p>No borrow requests found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Book</th>
              <th>Requester</th>
              <th>Email</th>
              <th>Status</th>
              <th>Borrow Until</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.book?.title}</td>

                <td>{request.requester?.name}</td>

                <td>{request.requester?.email}</td>

                <td>{request.status}</td>

                <td>
                  {request.borrowUntil
                    ? new Date(request.borrowUntil).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  {request.status === "Pending" ? (
                    <>
                      <button onClick={() => acceptRequest(request._id)}>
                        Accept
                      </button>

                      <button
                        onClick={() => rejectRequest(request._id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Requests;
