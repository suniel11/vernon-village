import { useState } from "react";

const Submit = () => {
  const [form, setForm] = useState({ title: "", description: "", author: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Announcement submitted for approval!");
    setForm({ title: "", description: "", author: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Submit an Announcement</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <input type="text" name="author" placeholder="Your Name" value={form.author} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Submit;
