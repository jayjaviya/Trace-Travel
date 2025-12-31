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

// ========== CONTACT FORM SCHEMA ==========
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ========== GALLERY IMAGE SCHEMA ==========
const galleryImageSchema = new mongoose.Schema({
  src: String,
  alt: String,
  title: String
});
const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

// ========== CONTACT FORM ROUTES ==========

// Save contact form with duplicate check
app.post('/save-contact', async (req, res) => {
  try {
    console.log('📥 Form data received:', req.body);
    
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.json({ 
        success: false, 
        message: 'Name, Email, and Message are required!' 
      });
    }
    
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

// ========== GALLERY IMAGE ROUTES ==========

// GET all gallery images
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

// GET single image by ID
app.get('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid image ID format'
      });
    }
    
    const image = await GalleryImage.findById(id);
    
    if (!image) {
      return res.json({
        success: false,
        message: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      image: image
    });
    
  } catch (error) {
    console.error('Error fetching image:', error);
    res.json({
      success: false,
      message: 'Failed to load image'
    });
  }
});

// POST - Add new image
app.post('/api/gallery', async (req, res) => {
  try {
    const { src, alt, title } = req.body;
    
    if (!src || !alt) {
      return res.json({
        success: false,
        message: 'src and alt fields are required'
      });
    }
    
    const newImage = new GalleryImage({
      src: src,
      alt: alt,
      title: title || alt
    });
    
    await newImage.save();
    res.json({
      success: true,
      message: 'Image added to gallery',
      image: newImage
    });
    
  } catch (error) {
    console.error('Error adding image:', error);
    res.json({
      success: false,
      message: 'Failed to add image'
    });
  }
});

// PUT - Update image by ID
app.put('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { src, alt, title } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid image ID format'
      });
    }
    
    if (!src && !alt && !title) {
      return res.json({
        success: false,
        message: 'At least one field (src, alt, or title) is required to update'
      });
    }
    
    const updateData = {};
    if (src) updateData.src = src;
    if (alt) updateData.alt = alt;
    if (title) updateData.title = title;
    
    const updatedImage = await GalleryImage.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!updatedImage) {
      return res.json({
        success: false,
        message: 'Image not found with the given ID'
      });
    }
    
    res.json({
      success: true,
      message: 'Image updated successfully',
      image: updatedImage
    });
    
  } catch (error) {
    console.error('Error updating image:', error);
    res.json({
      success: false,
      message: 'Error updating image'
    });
  }
});

// DELETE - Remove image by ID
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: 'Invalid image ID format'
      });
    }
    
    const deletedImage = await GalleryImage.findByIdAndDelete(id);
    
    if (!deletedImage) {
      return res.json({
        success: false,
        message: 'Image not found with the given ID'
      });
    }
    
    res.json({
      success: true,
      message: 'Image deleted successfully',
      image: deletedImage
    });
    
  } catch (error) {
    console.error('Error deleting image:', error);
    res.json({
      success: false,
      message: 'Error deleting image'
    });
  }
});

// ========== TEST ROUTES ==========

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    mongoose: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ========== START SERVER ==========

// Start server on PORT 2000
app.listen(2000, () => {
  console.log('🚀 Server running on http://localhost:2000');
  console.log('📞 Contact form: POST http://localhost:2000/save-contact');
  console.log('🖼️ Gallery API: GET http://localhost:2000/api/gallery');
  console.log('🧪 Test: GET http://localhost:2000/test');
});