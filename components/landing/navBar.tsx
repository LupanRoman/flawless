import React from 'react';
import AuthButton from '@components/AuthButton';

type Props = {};

function NavBar({}: Props) {
  return (
    <>
      <div>
        <AuthButton />
      </div>
    </>
  );
}

export default NavBar;
