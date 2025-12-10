import "./About.css";
import "./Contact.css";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log('Form submitted:', formData);
    
    const timestamp = new Date().getTime();
    const formKey = `contact_form_${timestamp}`;
    localStorage.setItem(formKey, JSON.stringify(formData));
    
    alert('Form submitted successfully!');
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    
    setErrors({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: {}
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user_preferences');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user.name || user.email) {
      localStorage.setItem('user_preferences', JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <section className="header">
        <div className="container">
          <h2>Contact</h2>
          <div className="header_element">
            <p className="tag_1">
              <span>Home</span>
            </p>
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
            </div>
            
            <form className="fill_form" onSubmit={handleSubmit}>
              <div className="fill_detail">
                {/* Name Input */}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error-border" : ""}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                {/* Email Input */}
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error-border" : ""}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                {/* Subject Input */}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error-border" : ""}
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>
                
                {/* Message Input */}
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    name="message"
                    placeholder="Message"
                    className={`Message_detail ${errors.message ? "error-border" : ""}`}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                
                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                  <span>Send Message</span>
                </button>
              </div>
              
              <div className="Other_detail">
                <div className="other_detail_rightside">
                  <div>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h2>Address</h2>
                    <p>#135 block, Barnard St. Brooklyn, London 10036, UK</p>
                  </div>
                </div>

                <div className="other_detail_rightside">
                  <div>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h2>Telephone</h2>
                    <p>+91 9879069667</p>
                    <p>+91 9879069667</p>
                  </div>
                </div>

                <div className="other_detail_rightside">
                  <div>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </div>
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