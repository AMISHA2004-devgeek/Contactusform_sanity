import React, { useState, useEffect } from 'react';
import { client } from './sanityClient';
// Importing icons
import { Send, User, Mail, MessageSquare, Building2 } from 'lucide-react';
// Importing type-writer animation
import { Typewriter } from 'react-simple-typewriter';

const AnimatedContactForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // This effect is responsible for showing the form after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3000);
    return () => clearTimeout(timer);  // Cleanup the timer
  }, []);

  // Check if the email already exists in the "emailofusers" schema
  const checkEmailExists = async (email) => {
    const query = `*[_type == "emailofusers" && email == $email][0]`;
    const params = { email };
    try {
      const result = await client.fetch(query, params);
      return result ? true : false;
    } catch (err) {
      console.error('Error checking email:', err);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    // Check if the email already exists
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setStatus('Please wait a moment until we evaluate your previous submission before you can submit again.');
      return;
    }
    
    try {
      // Send form data to Sanity
      await client.create({
        _type: 'formData',
        ...formData
      });
      
      // Add the email to the "emailofusers" schema
      await client.create({
        _type: 'emailofusers',
        email: formData.email
      });

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${showForm ? 'bg-slate-900' : 'bg-white'} transition-colors duration-1000`}>
      {/* SVG Animation */}
      <div className={`absolute inset-0 transition-all duration-1000 ${showForm ? 'opacity-40' : 'opacity-100'}`}>
    
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#026e3f" strokeWidth="0.5" opacity="0.2"/>
              <circle cx="0" cy="0" r="1" fill="#026e3f" opacity="0.3"/>
            </pattern>
            
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#026e3f" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#026e3f" stopOpacity="0"/>
            </radialGradient>

            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,50 L40,50 M60,50 L90,50 M50,10 L50,40 M50,60 L50,90" 
                    stroke="#026e3f" 
                    strokeWidth="0.5" 
                    opacity="0.3"
                    fill="none"/>
              <circle cx="50" cy="50" r="3" fill="#026e3f" opacity="0.3"/>
            </pattern>
          </defs>

          <rect width="400" height="200" fill="url(#grid)">
            <animate attributeName="opacity"
                     values="0.8;1;0.8"
                     dur="3s"
                     repeatCount="indefinite"/>
          </rect>
          <rect width="400" height="200" fill="url(#circuit)" opacity="0.3"/>

          <path d="M0,50 Q50,50 100,100 T200,100" 
                stroke="#026e3f" 
                fill="none" 
                strokeWidth="1"
                opacity="0.5">
            <animate attributeName="stroke-dasharray"
                     values="0,1000;1000,0"
                     dur="4s"
                     repeatCount="indefinite"/>
          </path>

          <g>
            <circle cx="0" cy="0" r="2" fill="#026e3f">
              <animateMotion 
                path="M0,50 Q50,50 100,100 T200,100"
                dur="3s"
                repeatCount="indefinite"/>
            </circle>
            <circle cx="0" cy="0" r="2" fill="#026e3f">
              <animateMotion 
                path="M0,50 Q50,50 100,100 T200,100"
                dur="3s"
                begin="1s"
                repeatCount="indefinite"/>
            </circle>
          </g>

          <g fill="#026e3f" opacity="0.3">
            <text x="50" y="40" fontFamily="monospace">@</text>
            <text x="320" y="160" fontFamily="monospace"></text>
            <text x="80" y="120" fontFamily="monospace">&lt;/&gt;</text>
            <text x="280" y="40" fontFamily="monospace"></text>
            <animateTransform attributeName="transform"
                          type="translate"
                          values="0,0; 0,5; 0,0"
                          dur="3s"
                          repeatCount="indefinite"/>
          </g>

          <g transform="translate(200 100)">
            <path d="M30,0 L15,-26 L-15,-26 L-30,0 L-15,26 L15,26 Z" 
                  fill="none" 
                  stroke="#026e3f" 
                  strokeWidth="1">
              <animateTransform attributeName="transform"
                            type="rotate"
                            from="0"
                            to="360"
                            dur="10s"
                            repeatCount="indefinite"/>
            </path>
            
            <circle r="35" fill="none" stroke="#026e3f" strokeWidth="2" strokeDasharray="20,10">
              <animateTransform attributeName="transform"
                            type="rotate"
                            from="0"
                            to="360"
                            dur="8s"
                            repeatCount="indefinite"/>
            </circle>
            
            <circle r="25" fill="none" stroke="#026e3f" strokeWidth="2" strokeDasharray="10,5">
              <animateTransform attributeName="transform"
                            type="rotate"
                            from="360"
                            to="0"
                            dur="4s"
                            repeatCount="indefinite"/>
            </circle>

            <circle r="15" fill="none" stroke="#026e3f" strokeWidth="1">
              <animate attributeName="r"
                       values="15;17;15"
                       dur="2s"
                       repeatCount="indefinite"/>
              <animate attributeName="opacity"
                       values="0.5;1;0.5"
                       dur="2s"
                       repeatCount="indefinite"/>
            </circle>

            <path d="M-15,-5 L0,-15 L15,-5 L0,5 Z" fill="#026e3f">
              <animate attributeName="opacity"
                       values="0.7;1;0.7"
                       dur="2s"
                       repeatCount="indefinite"/>
            </path>
          </g>

          <g transform="translate(200 100)">
            <circle r="0" fill="none" stroke="#026e3f">
              <animate attributeName="r"
                       values="0;60"
                       dur="3s"
                       repeatCount="indefinite"/>
              <animate attributeName="opacity"
                       values="0.5;0"
                       dur="3s"
                       repeatCount="indefinite"/>
            </circle>
            <circle r="0" fill="none" stroke="#026e3f">
              <animate attributeName="r"
                       values="0;60"
                       dur="3s"
                       begin="1s"
                       repeatCount="indefinite"/>
              <animate attributeName="opacity"
                       values="0.5;0"
                       dur="3s"
                       begin="1s"
                       repeatCount="indefinite"/>
            </circle>
          </g>

          <text x="200" y="150" fill="#026e3f" fontFamily="monospace" fontSize="8" opacity="0.5">
            <textPath href="#dataPath">10110010 01001101 11010011</textPath>
            <animate attributeName="opacity"
                     values="0.3;0.7;0.3"
                     dur="2s"
                     repeatCount="indefinite"/>
          </text>
          <path id="dataPath" d="M100,150 C200,150 200,150 300,150" fill="none"/>

          <g stroke="#026e3f" fill="#026e3f">
            <circle cx="40" cy="180" r="2">
              <animate attributeName="opacity"
                       values="0.3;1;0.3"
                       dur="2s"
                       repeatCount="indefinite"/>
            </circle>
            <circle cx="360" cy="20" r="2">
              <animate attributeName="opacity"
                       values="0.3;1;0.3"
                       dur="2s"
                       begin="0.5s"
                       repeatCount="indefinite"/>
            </circle>
            <line x1="40" y1="180" x2="360" y2="20" strokeWidth="0.5" opacity="0.2">
              <animate attributeName="opacity"
                       values="0.1;0.3;0.1"
                       dur="2s"
                       repeatCount="indefinite"/>
            </line>
          </g>

              </svg>
      </div>

      {/* Contact Form */}
      <div className={`relative w-full max-w-xl transition-all duration-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-emerald-800/30 p-8">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-emerald-500 mb-2">Get in Touch</h2>
              <p className="text-slate-400">
                <Typewriter
                  words={["We'd love to hear from you!"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="pl-10 py-3 rounded-lg w-full text-lg border border-slate-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="pl-10 py-3 rounded-lg w-full text-lg border border-slate-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="pl-10 py-3 rounded-lg w-full text-lg border border-slate-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="pl-10 py-3 rounded-lg w-full text-lg border border-slate-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="relative">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-emerald-500 text-white text-lg font-semibold shadow-md hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500"
                >
                 <Send className="inline mr-2" />
                 Send Message
                </button>
                {status && (
    <div className="mt-4 text-center text-sm text-emerald-400">
      {status}
    </div>
  )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedContactForm;
