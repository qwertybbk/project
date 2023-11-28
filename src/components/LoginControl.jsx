import React, { useState } from 'react';

const LoginControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className='login-container'>
      {isLoggedIn ? (
        <div className='login-wrap'>
          <button onClick={handleLogoutClick}>로그아웃</button>
          <p>환영합니다!</p>
        </div>
      ) : (
        <div className='login-wrap'>
          <button onClick={handleLoginClick}>로그인</button>
          <p>로그인 해주세요!</p>
        </div>
      )}
    </div>
  );
};

export default LoginControl;
