import Link from 'next/link';
import InstagramLogo from "@/public/logos/instagram.svg"
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-semibold text-gray-800">
              CopyCoach - Closed Beta
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="https://www.instagram.com/arthurluca101/" target="_blank" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <Image src={InstagramLogo} alt="Instagram Logo" className="h-4 w-4 mr-2" />
            @arthurluca101
          </Link>
          {/* Add more social media links here */}
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CopyCoach. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
