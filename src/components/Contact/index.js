import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import Img from '../../assets/Message sent - 640x479 (1).png'

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

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
          })
        },
        (error) => {
          console.log(error.text)
          Swal.fire({
            icon: 'error',
            title: "Erreur lors de l'envoi du message.",
            text: error.text,
          })
        }
      )

    setFormData({ from_name: '', from_email: '', message: '' })
  }

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
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
          }}
        ></div>
      </main>
    </div>
  )
}
