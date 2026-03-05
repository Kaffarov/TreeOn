import React, { useState } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-50">
      <p className="inline-block mr-4">
        This website uses cookies to enhance your experience.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="bg-primary-500 px-4 py-2 rounded-lg hover:bg-primary-600"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;