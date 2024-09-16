import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Img from '../../assets/Message sent - 640x479 (1).png';

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_72acn3v',
        'template_yr0uonj',
        e.target,
        'R2PkxWVMmSHoyhnCr'
      )
      .then(
        (result) => {
          Swal.fire({
            icon: 'success',
            title: 'Message envoyé avec succès!',
            text: 'Nous vous contacterons bientôt.',
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: 'error',
            title: "Erreur lors de l'envoi du message.",
            text: error.text,
          });
        }
      );

    setFormData({ from_name: '', from_email: '', message: '' });
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <main className="relative container mx-auto px-4">
        <img className="mx-auto mb-12 max-w-full h-auto" src={Img} alt="Message sent" />
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600">
          <div className="max-w-lg space-y-3 mx-auto text-center mb-12">
            <h3 className="text-4xl font-semibold text-white mb-6">
              Contact
            </h3>
            <p className="text-gray-300">
              Nous aimerions recevoir de vos nouvelles! Veuillez remplir le
              formulaire ci-dessous.
            </p>
          </div>
          <div className="mt-12 mx-auto p-8 bg-white sm:max-w-lg rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-2">Nom Complet</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChange}
                  value={formData.from_name}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChange}
                  value={formData.from_email}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-36 resize-none"
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition duration-150 ease-in-out"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </main>

      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isChatbotOpen}
        onClick={toggleChatbot}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>

      {isChatbotOpen && (
        <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
          <div className="flex justify-between items-center pb-6">
            <div className="flex flex-col space-y-1.5">
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
              <p className="text-sm text-[#6b7280] leading-3">Powered by MegaBonPlan</p>
            </div>
            <button onClick={toggleChatbot} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
            <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed"><span className="block font-bold text-gray-700">AI </span>Hi, how can I help you today?</p>
            </div>
            <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <svg stroke="none" fill="black" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed"><span className="block font-bold text-gray-700">You </span>fewafef</p>
            </div>
            <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed"><span className="block font-bold text-gray-700">AI </span>Sorry, I couldn't find any information in the documentation about that. Expect answer to be less accurateI could not find the answer to this in the verified sources.</p>
            </div>
          </div>
          <div className="flex items-center pt-0">
            <form className="flex items-center justify-center w-full space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value=""
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
