import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1A750F] text-white py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tools & API */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tools & API</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mini App
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Condition
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Get Updates */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Get Updates</h3>
          <p className="text-sm mb-4">
            Sign up for our mailing list and we will let you know when we
            release new features or updates.
          </p>
          <form className="flex items-center border-2 border-[#0ED2F7] bg-white rounded-lg overflow-hidden px-4">
            <div className="p-2">
              <FaEnvelope className="text-gray-600" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 flex-1 outline-none text-gray-900"
            />
          </form>
        </div>
      </div>
    </footer>
  );
}
