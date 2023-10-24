import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';

export const UserDropdown = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    console.log('start');
    signOut();
    console.log('end');
  };

  const handleSignIn = () => {
    console.log('start');
    signIn();
    console.log('end');
  };


  if (!session) {
    return (
      <Button onPress={handleSignIn} color="primary" variant="flat">
        Entrar
      </Button>
    );
  }

  return (
    <Dropdown placement="bottom-end" trigger="press">
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            icon={<FaUser />}
            as="button"
            color="secondary"
            size="md"
            src={session.user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="User menu actions" onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key="profile"
          textValue="Profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{session.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" textValue="Settings">
          <Link href="/profile">Profile</Link>
        </DropdownItem>
        {session && session.user.role === 'admin' ? (
          <DropdownItem key="admin_settings" textValue="Admin Settings">
            <Link href="/admin">Admin</Link>
          </DropdownItem>
        ) : <DropdownItem key="empty" textValue="" /> }
        <DropdownItem key="configurations" textValue="Configurations">
          Configurations
        </DropdownItem>
        <DropdownItem key="logout" textValue="Sign Out" color="danger" className="text-danger">
          <Button onPress={handleSignOut}>
            <span>Sair</span>
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};


