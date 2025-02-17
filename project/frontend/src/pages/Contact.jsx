import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded my-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Contact;
