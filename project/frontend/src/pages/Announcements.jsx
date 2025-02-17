import { useEffect, useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements") // Backend URL
      .then((res) => res.json())
      .then((data) => setAnnouncements(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Community Announcements</h1>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="p-4 border my-4 rounded shadow">
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p className="text-gray-600">{announcement.description}</p>
            <p className="text-sm text-gray-500">By {announcement.author}</p>
          </div>
        ))
      ) : (
        <p>No announcements yet.</p>
      )}
    </div>
  );
};

export default Announcements;
