import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

// Define the component using the project's aesthetic: 
// Background: #E6E6FA (Light Lavender)
// Text/Main: #4B0082 (Dark Purple/Indigo)
// Accent/Button: #C71585 (Deep Magenta)

const contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Mock API call simulation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      console.log('Form Submitted:', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <style jsx="true">{`
        .contact-container {
          min-height: 100vh;
          background-color: #E6E6FA; /* Light Lavender */
          padding: 1.5rem; /* p-6 */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .contact-container {
            padding: 2.5rem; /* sm:p-10 */
          }
        }
        .main-card {
          background-color: white;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
          border-radius: 1rem; /* rounded-2xl */
          width: 100%;
          max-width: 80rem; /* max-w-6xl */
          overflow: hidden;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .grid-layout {
            grid-template-columns: repeat(2, 1fr); /* lg:grid-cols-2 */
          }
        }
        .form-section {
          padding: 3rem; /* p-12 */
        }
        .form-heading {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 800; /* font-extrabold */
          margin-bottom: 1rem; /* mb-4 */
          color: #4B0082; /* Dark Purple/Indigo */
          letter-spacing: -0.025em; /* tracking-tight */
        }
        .form-paragraph {
          margin-bottom: 2rem; /* mb-8 */
          color: #4B0082; /* indigo-700 equivalent for context */
        }
        .form-label {
          display: block;
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          margin-bottom: 0.25rem; /* mb-1 */
          color: #4B0082; /* Dark Purple/Indigo */
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem; /* p-3 */
          margin-bottom: 1rem; /* mb-4 */
          border: 1px solid #C7BFFB; /* border-indigo-300 */
          border-radius: 0.5rem; /* rounded-lg */
          color: #4B0082;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          placeholder-color: #6C7BB8; /* placeholder-indigo-400 equivalent */
        }
        .form-input:focus, .form-textarea:focus {
          border-color: #C71585; /* focus:border-[#C71585] */
          box-shadow: 0 0 0 4px rgba(199, 21, 133, 0.2); /* focus:ring-4 & focus:ring-opacity-50 */
          outline: none;
        }
        .submit-button {
          width: 100%;
          padding: 0.75rem; /* py-3 */
          margin-top: 0.5rem; /* mt-2 */
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          color: white;
          background-color: #C71585; /* Deep Magenta */
          border-radius: 0.5rem; /* rounded-lg */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-lg */
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #B80F74; /* Darker Pink/hover:bg-pink-700 equivalent */
        }
        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(199, 21, 133, 0.5); /* focus:ring-4 focus:ring-[#C71585] focus:ring-opacity-50 */
        }
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .info-section {
          padding: 3rem; /* p-12 */
          background-color: #F8F7FF; /* bg-indigo-50/50 equivalent */
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .info-heading {
          font-size: 1.875rem; /* text-3xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 1.5rem; /* mb-6 */
          color: #4B0082; /* Dark Purple/Indigo */
        }
        .info-detail {
          display: flex;
          align-items: flex-start;
        }
        .info-icon {
          width: 1.5rem; /* w-6 */
          height: 1.5rem; /* h-6 */
          margin-right: 0.75rem; /* mr-3 */
          color: #C71585; /* Deep Magenta */
          flex-shrink: 0;
          margin-top: 0.25rem; /* mt-1 */
        }
        .info-detail h3 {
          font-weight: 600; /* font-semibold */
          color: #4B0082;
        }
        .social-links {
          margin-top: 2.5rem; /* mt-10 */
          padding-top: 1.5rem; /* pt-6 */
          border-top: 1px solid #E0E7FF; /* border-t border-indigo-200 */
        }
        .social-icon {
            color: #4f46e5; /* text-indigo-600 */
            transition: color 0.15s;
        }
        .social-icon:hover {
            color: #C71585; /* hover:text-[#C71585] */
        }
      `}</style>
      <div className="main-card">
        
        <div className="grid-layout">
          
          {/* Contact Form Section */}
          <div className="form-section">
            <h1 className="form-heading">
              Get in Touch
            </h1>
            <p className="form-paragraph">
              We'd love to hear from you! Whether you have questions about custom orders or need support, our team is here to help.
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              {status && (
                <div className={`p-3 mb-4 rounded-lg text-sm ${
                  status.includes('success') ? 'bg-green-100 text-green-700' : 
                  status.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {status}
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={status === 'Sending...'}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Shop Info Section */}
          <div className="info-section">
            <h2 className="info-heading">
              Our Details
            </h2>
            
            <div className="space-y-6 text-indigo-800">
              <div className="info-detail">
                <Mail className="info-icon" />
                <div>
                  <h3 className="font-semibold text-[#4B0082]">Email Support</h3>
                  <p>shreemcrafts.support@example.com</p>
                </div>
              </div>

              <div className="info-detail">
                <Phone className="info-icon" />
                <div>
                  <h3 className="font-semibold text-[#4B0082]">Phone</h3>
                  <p>+91 98765 43210 (Mon - Fri, 10am - 6pm IST)</p>
                </div>
              </div>

              <div className="info-detail">
                <MapPin className="info-icon" />
                <div>
                  <h3 className="font-semibold text-[#4B0082]">Studio Location</h3>
                  <p>
                    123 Resin Lane, Craft District, Mumbai, India.
                  </p>
                </div>
              </div>
            </div>

            <div className="social-links">
                <h3 className="font-semibold text-[#4B0082] mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="#" className="social-icon"><Facebook className="w-6 h-6" /></a>
                    <a href="#" className="social-icon"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="social-icon"><Twitter className="w-6 h-6" /></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact;
