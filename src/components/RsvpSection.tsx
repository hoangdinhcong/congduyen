"use client";

import React, { useState } from "react";

const RsvpSection = () => {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      alert(`Cảm ơn ${name}! Chúng tôi đã nhận được xác nhận của bạn.`);

      setName("");
      setAttending(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="rsvp" className="bg-primary/20">
      <div className="section-container max-w-md mx-auto">
        <h2 className="section-title">Xác Nhận Tham Dự</h2>

        <div
          className="bg-white p-8 rounded-lg shadow-sm fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Họ Tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Họ và tên của bạn"
                required
              />
            </div>

            <div className="mb-8">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Bạn sẽ tham dự chứ?
              </p>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-2 px-4 border rounded-md transition-all ${
                    attending === true
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Có, tôi sẽ đến
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-2 px-4 border rounded-md transition-all ${
                    attending === false
                      ? "bg-gray-100 border-gray-300"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Rất tiếc, tôi không thể đến
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name || attending === null || loading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang gửi..." : "Gửi xác nhận"}
            </button>
          </form>
        </div>

        <div className="text-center mt-12 text-gray-600 fade-in font-sans" style={{ animationDelay: "0.4s" }}>
          <p className="font-sans">Vui lòng xác nhận trước ngày 1 tháng 4, 2025</p>
          <p className="mt-2 font-sans">Nếu bạn có câu hỏi, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:contact@example.com" className="text-primary hover:underline">contact@example.com</a></p>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
