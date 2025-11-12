import React, { useState, useEffect } from 'react';
 
/**
* Example 1: Basic Effect Hook
* Demonstrates useEffect with different dependency arrays
*/
function BasicEffectExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
 
  // Runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });
 
  // Runs only on mount
  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);
 
  // Runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);
 
  return (
    <div>
      <h2>Basic Effect Hook Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}
 
/**
* Example 2: Form to Submit Data
* Controlled form component with submission handling
*/
function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData.name);
    // Here you would typically send data to an API
    alert('Form submitted! Check console for data.');
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
 
/**
* Example 3: Hooks and Local Storage in Action
* Saving and retrieving data from localStorage
*/
function LocalStorageExample() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: {}
  });
 
  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, []);
 
  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user.name || user.email) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
 
  const handleNameChange = (e) => {
    setUser(prev => ({ ...prev, name: e.target.value }));
  };
 
  const handleEmailChange = (e) => {
    setUser(prev => ({ ...prev, email: e.target.value }));
  };
 
  const clearStorage = () => {
    localStorage.removeItem('user');
    setUser({ name: '', email: '', preferences: {} });
  };
 
  return (
    <div>
      <h2>Local Storage Example</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={user.email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </label>
      </div>
      <button onClick={clearStorage}>Clear Storage</button>
      <p>Data is automatically saved to localStorage!</p>
      <p>Refresh the page to see it persist.</p>
    </div>
  );
}
 
/**
* Example 4: Looping Through All LocalStorage Values
* Displaying all items stored in localStorage
*/
function LoopLocalStorageExample() {
  const [storageItems, setStorageItems] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
 
  // Load all localStorage items
  const loadStorageItems = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      items.push({ key, value });
    }
    setStorageItems(items);
  };
 
  // Load items on mount and when storage changes
  useEffect(() => {
    loadStorageItems();
    
    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = () => {
      loadStorageItems();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
 
  const addItem = () => {
    if (newKey && newValue) {
      localStorage.setItem(newKey, newValue);
      setNewKey('');
      setNewValue('');
      loadStorageItems();
    }
  };
 
  const removeItem = (key) => {
    localStorage.removeItem(key);
    loadStorageItems();
  };
 
  const clearAll = () => {
    localStorage.clear();
    loadStorageItems();
  };
 
  return (
    <div>
      <h2>Loop Through LocalStorage Values</h2>
      
      <div>
        <h3>Add New Item</h3>
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Key"
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Value"
        />
        <button onClick={addItem}>Add</button>
      </div>
 
      <div>
        <h3>All LocalStorage Items ({storageItems.length})</h3>
        <button onClick={loadStorageItems}>Refresh</button>
        <button onClick={clearAll}>Clear All</button>
        
        {storageItems.length === 0 ? (
          <p>No items in localStorage</p>
        ) : (
          <ul>
            {storageItems.map((item, index) => (
              <li key={index}>
                <strong>{item.key}:</strong> {item.value}
                <button onClick={() => removeItem(item.key)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <div>
        <h3>Alternative: Using Object.keys()</h3>
        <pre>
          {JSON.stringify(
            Object.keys(localStorage).reduce((acc, key) => {
              acc[key] = localStorage.getItem(key);
              return acc;
            }, {}),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
 
/**
* Complete Example: Todo App with LocalStorage
* Combines all concepts: form, useEffect, and localStorage
*/
function TodoAppExample() {
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
    <div>
      <h2>Todo App with LocalStorage</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
    </div>
  );
}
 
// Export all examples
export {
  BasicEffectExample,
  FormExample,
  LocalStorageExample,
  LoopLocalStorageExample,
  TodoAppExample
};