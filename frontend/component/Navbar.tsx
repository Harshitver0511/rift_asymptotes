import Link from 'next/link';
const Navbar = () => {
  return (
    <div className="w-full p-4">
     
      <nav className="flex items-center justify-between px-6 py-3 mx-auto max-w-6xl bg-white border border-gray-300 rounded-full shadow-sm">
        
      
        <div className="flex items-center gap-2">
         
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12" 
              stroke="black" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <path 
              d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12" 
              stroke="black" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-black">
            asymptotes
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-900">
          <Link href="/features" className="hover:text-gray-600 transition-colors">
            Features
          </Link>
          <Link href="#docs" className="hover:text-gray-600 transition-colors">
            Docs
          </Link>
          <Link href="#resources" className="hover:text-gray-600 transition-colors">
            Analysis
          </Link>
        </div>

        {/* Right: Auth Links */}
        {/* <div className="flex items-center gap-5 font-medium">
          <Link href="#login" className="hidden sm:block text-gray-900 hover:text-gray-600 transition-colors">
            Log in
          </Link>
          <Link 
            href="#signup" 
            className="px-5 py-2 text-sm text-white bg-[#0a0a0a] rounded-full hover:bg-gray-800 transition-colors"
          >
            Sign up
          </Link>
        </div> */}

      </nav>
    </div>
  )
}

export default Navbar