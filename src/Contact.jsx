import "./About.css";
import "./Contact.css";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check required fields
    if (!formData.name || !formData.email || !formData.message) {
      setMessage("❌ Please fill Name, Email, and Message");
      return;
    }

    setLoading(true);
    setMessage("Sending...");

    try {
      // Send to backend on PORT 2000
      const response = await fetch('http://localhost:2000/save-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Form submitted! Data saved to MongoDB.");
        // Clear form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMessage("❌ Error: " + result.message);
      }
      
    } catch (error) {
      setMessage("❌ Cannot connect to backend. Make sure it's running!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Test backend connection
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:2000/test');
      const result = await response.json();
      alert("✅ Backend is working: " + result.message);
    } catch (error) {
      alert("❌ Backend not running. Start it first!");
    }
  };

  return (
    <>
      <section className="header">
        <div className="container">
          <h2>Contact</h2>
          <div className="header_element">
            <p className="tag_1"><span>Home</span></p>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <p className="tag_2">Contact</p>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact_form">
            <div className="contact_title">
              <h4>Find us</h4>
              <h2>Get In Touch With Us</h2>
              <button 
                onClick={testBackend}
                style={{
                  background: '#ffa127',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
              >
                Test Backend Connection
              </button>
            </div>
            
            {/* Message Display */}
            {message && (
              <div className={message.includes("✅") ? "success-message" : "error-message-alert"}>
                {message}
              </div>
            )}
            
            <form className="fill_form" onSubmit={handleSubmit}>
              <div className="fill_detail">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name *" 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
                
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email *" 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                />
                
                <input 
                  type="text" 
                  name="message"
                  placeholder="Message *"
                  className="Message_detail"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
                
                <button type="submit" className="submit-btn" disabled={loading}>
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
              
              <div className="Other_detail">
                <div className="other_detail_rightside">
                  <div><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                  <div>
                    <h2>Address</h2>
                    <p>#135 block, Barnard St. Brooklyn, London 10036, UK</p>
                  </div>
                </div>

                <div className="other_detail_rightside">
                  <div><i className="fa fa-phone" aria-hidden="true"></i></div>
                  <div>
                    <h2>Telephone</h2>
                    <p>+91 9879069667</p>
                    <p>+91 9879069667</p>
                  </div>
                </div>

                <div className="other_detail_rightside">
                  <div><i className="fa fa-envelope" aria-hidden="true"></i></div>
                  <div>
                    <h2>Email Us</h2>
                    <p>jdjaviya98790@gmail.com</p>
                    <p>jdjaviya98790@gmail.com</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;