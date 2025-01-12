

export const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-orange-500 to-yellow-400 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Amazon Scrapy Bot</h1>
        <p className="text-lg md:text-xl mt-4">
          Track prices, stay updated, and never miss a deal with our intelligent Amazon bot.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-orange-500 font-semibold rounded-full shadow-lg hover:bg-gray-100">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold text-orange-500 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">Monitor prices as they change with instant updates.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold text-orange-500 mb-2">Custom Alerts</h3>
            <p className="text-gray-600">Get notified immediately when your desired price is reached.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold text-orange-500 mb-2">Affordable Plans</h3>
            <p className="text-gray-600">Flexible pricing options for every need.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-600">
              "This bot saved me so much money! I love how easy it is to use."
            </p>
            <h4 className="text-orange-500 font-bold mt-4">- Sarah L.</h4>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-600">
              "The custom alerts are a game changer. Highly recommend!"
            </p>
            <h4 className="text-orange-500 font-bold mt-4">- James P.</h4>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-600">
              "Super intuitive and the best price tracking tool I've ever used."
            </p>
            <h4 className="text-orange-500 font-bold mt-4">- Emily R.</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

