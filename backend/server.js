const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Allow all connections
app.use(cors());

// Read JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactDB')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));

// Create data structure
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Save form data with duplicate check
app.post('/save-contact', async (req, res) => {
  try {
    console.log('📥 Form data received:', req.body);
    
    // Check required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.json({ 
        success: false, 
        message: 'Name, Email, and Message are required!' 
      });
    }
    
    // DUPLICATE CHECK - Check if exact same details already exist
    const existingContact = await Contact.findOne({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject || '',
      message: req.body.message
    });
    
    if (existingContact) {
      console.log('❌ Duplicate found');
      return res.json({ 
        success: false, 
        message: 'Details already submitted!' 
      });
    }
    
    // Save if no duplicate
    const newContact = new Contact(req.body);
    await newContact.save();
    
    console.log('✅ Data saved');
    res.json({ 
      success: true, 
      message: 'Form submitted successfully!' 
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.json({ 
      success: false, 
      message: 'Error submitting form. Please try again.' 
    });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Backend is working!' });
});

// Start server on PORT 2000
app.listen(2000, () => {
  console.log('🚀 Server running on http://localhost:2000');
  console.log('🔗 Test: http://localhost:2000/test');
});




// Add this AFTER your Contact model but BEFORE the routes:

// Gallery Image Schema
const galleryImageSchema = new mongoose.Schema({
  src: String,
  alt: String,
  title: String
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

// Add this route AFTER your other routes (like /save-contact):
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json({
      success: true,
      images: images
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.json({
      success: false,
      message: 'Failed to load gallery'
    });
  }
});