import "./About.css";
import "./Contact.css";
import React, { useEffect, useRef, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Save form data with a unique key to prevent overwriting
    const timestamp = new Date().getTime();
    const formKey = `contact_form_${timestamp}`;
    localStorage.setItem(formKey, JSON.stringify(formData));
    
    
    // Here you would typically send data to an API
    alert('Form submitted! Check console for data.');
    
    // Optional: Reset form after submission
    setFormData({
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
    // Load user preferences from a DIFFERENT key
    const savedUser = localStorage.getItem('user_preferences');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, []);

  // Save user preferences to a DIFFERENT key
  useEffect(() => {
    if (user.name || user.email) {
      localStorage.setItem('user_preferences', JSON.stringify(user));
    }
  }, [user]);

    // Todo App State and Functions
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
   
    // Load todos from localStorage on mount
    useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          setTodos(JSON.parse(savedTodos));
        } catch (error) {
          console.error('Error loading todos:', error);
        }
      }
    }, []);
   
    // Save todos to localStorage whenever todos change
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
   
    const addTodo = (e) => {
      e.preventDefault();
      if (input.trim()) {
        const newTodo = {
          id: Date.now(),
          text: input,
          completed: false
        };
        setTodos([...todos, newTodo]);
        setInput('');
      }
    };
   
    const toggleTodo = (id) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    };
   
    const deleteTodo = (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };

  return (
    <>
      <section className="header">
        <div className="container">
          <h2>Contact</h2>
          <div className="header_element">
            <p className="tag_1">
              {" "}
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
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  name="message"
                  placeholder="Message"
                  className="Message_detail"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <a href="#" onClick={handleSubmit}>
                  <span>Send Message</span>
                </a>
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

      <section className="todo-app-section">
        <div className="container">
          <div className="todo-app-container">
            <h2>Todo App with LocalStorage</h2>
            <form onSubmit={addTodo} className="todo-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a todo..."
                className="todo-input"
              />
              <button type="submit" className="todo-add-btn">Add</button>
            </form>
            
            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo.id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                  <button onClick={() => deleteTodo(todo.id)} className="todo-delete-btn">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="todo-stats">
              <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default Contact;