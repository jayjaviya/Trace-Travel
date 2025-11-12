import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import App from "./App";
import Footer from "./Footer";
import Header from "./Header";
import About from "./About";
import Service from "./Service";
import Destination from "./Destination";
import Contact from "./Contact";


const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<App />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/service" element={<Service />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);