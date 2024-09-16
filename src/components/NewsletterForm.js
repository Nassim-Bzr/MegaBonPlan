import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSubscribed
      ? 'https://megabonplan-f8522b195111.herokuapp.com/api/subscriptions/unsubscribe'
      : 'https://megabonplan-f8522b195111.herokuapp.com/api/subscriptions/subscribe';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Une erreur est survenue.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Abonnez-vous à notre Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isSubscribed ? 'Se désabonner' : 'S\'abonner'}
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
      <button
        onClick={() => setIsSubscribed(!isSubscribed)}
        className="text-blue-500 mt-4"
      >
        {isSubscribed ? 'Revenir à l\'abonnement' : 'Se désabonner'}
      </button>
    </div>
  );
};

export default NewsletterForm;