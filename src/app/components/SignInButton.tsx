import React, { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const SignInButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center">
      {session ? (
        <div className="relative" ref={menuRef}>
          <button onClick={handleMenuToggle} className="mr-3 focus:outline-none">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ? session.user.name : "avatar"}
                className="inline-block rounded-full h-10 w-10 cursor-pointer"
              />
            ) : (
              <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100 cursor-pointer">
                noimage
              </span>
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-64 md:w-96 rounded-xl py-2 bg-white dark:bg-react shadow-lg focus:outline-none">
              <div className="mb-4 flex flex-col gap-2 px-4 text-sm">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ? session.user.name : "avatar"}
                    className="rounded-full h-10 w-10"
                  />
                ) : (
                  <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    noimage2
                  </span>
                )}
                <div>
                  <p className="font-medium text-gray-600">
                    {session.user.name || 'User name'}
                  </p>
                  <p className="text-gray-500">{session.user.email}</p>
                </div>
              </div>
              <a
                href="/profile"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span>Perfil</span>
              </a>
              <button
                className="border-2 border-blue-600 text-blue-600 rounded-md px-3 py-1 my-2 mx-4 hover:bg-blue-600 hover:text-white transition-all"
                onClick={handleSignOut}
              >
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="border-2 border-blue-600 text-blue-600 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white transition-all focus:outline-none"
          onClick={() => signIn()}
        >
          Entrar
        </button>
      )}
    </div>
  );
};

export default SignInButton;
