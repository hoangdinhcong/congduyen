import { Heart, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-50 mt-16">
      <div className="container-wedding">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-serif text-xl">Cong</span>
              <Heart className="text-primary" size={16} />
              <span className="font-serif text-xl">Duyen</span>
            </div>
            <p className="text-sm text-gray-600 font-sans">
              Join us to celebrate our special day
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          <p> {currentYear} Cong & Duyen. All rights reserved.</p>
          <p className="mt-1">Made with <Heart className="inline text-primary" size={12} /> for our special day</p>
        </div>
      </div>
    </footer>
  );
}
