import React, { useState, useEffect, useRef } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

const getUserImage = (user: User) => {
  if (user?.image) {
    return <img src={user.image} alt={user.name ? user.name : "avatar"} className="rounded-full" style={{ width: '36px' }} />;
  }
  return <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">{/* noimage2 */}</span>;
};

const SignOutButton = ({ onSignOut }: { onSignOut: () => Promise<void> }) => {
  return (
    <button
      className="border-2 text-blue-600 rounded-md px-3 py-1 my-2 mx-4 hover:bg-blue-600 hover:text-white transition-all focus:outline-none"
      onClick={onSignOut}
    >
      <span>Sair</span>
    </button>
  );
};

const SignInButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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
        <div className="relative" ref={menuRef} style={{ marginTop: '10px' }}>
          <button onClick={handleMenuToggle} className="mr-3 focus:outline-none">
            {getUserImage(session.user)}
          </button>
          {isMenuOpen && (
            <div className={`absolute right-0 mt-1 w-64 md:w-96 rounded-xl py-2 bg-white dark:bg-black shadow-lg focus:outline-none`}>
              <div className="mb-4 flex flex-col gap-2 px-4 text-sm">
                {getUserImage(session.user)}
                <div>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                    {session.user.name || 'User name'}
                  </p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{session.user.email}</p>
                </div>
              </div>
              <Link href="/profile">
                <div className={`inline-flex items-center gap-2 px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} cursor-pointer`}>
                  <span>Perfil</span>
                </div>
              </Link>
              <SignOutButton onSignOut={handleSignOut} />
            </div>
          )}
        </div>
      ) : (
        <button
          className="border-2 text-blue-600 rounded-md px-3 py-1 hover:bg-blue-600 hover:text-white transition-all focus:outline-none"
          onClick={() => signIn()}
        >
          Entrar
        </button>
      )}
    </div>
  );
};

export default SignInButton;
