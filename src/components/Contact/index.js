import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
export default function Contact() {
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_72acn3v', // Remplacez par votre service ID
            'template_yr0uonj', // Remplacez par votre template ID
            e.target,
            'R2PkxWVMmSHoyhnCr' // Remplacez par votre user ID (API Key)
        ).then(
          (result) => {
            Swal.fire({
              icon: "success",
              title: "Message envoyé avec succès!",
              text: "Nous vous contacterons bientôt.",
            });
          },
          (error) => {
            console.log(error.text);
            Swal.fire({
              icon: "error",
              title: "Erreur lors de l'envoi du message.",
              text: error.text,
            });
          }
        );
        

        setFormData({ from_name: '', from_email: '', message: '' }); // Réinitialiser les champs du formulaire
    };

    return (
        <div>
            <main className="relative py-28 bg-gray-900">
                <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
                    <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
                        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-white  sm:text-6xl font-semibold">Contact</h3>
            <p className="text-cyan-400 text-3xl font-semibold sm:text-2xl">
              Entrer en contact
            </p>
            <p className="text-gray-300">
              Nous aimerions recevoir de vos nouvelles! Veuillez remplir le
              formulaire ci-dessous.
            </p>
          </div>
                    </div>
                    <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="font-medium">Nom Complet</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    onChange={handleChange}
                                    value={formData.from_name}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Email</label>
                                <input
                                    type="email"
                                    name="from_email"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    onChange={handleChange}
                                    value={formData.from_email}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                                    onChange={handleChange}
                                    value={formData.message}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
