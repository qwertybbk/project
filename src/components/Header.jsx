import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
    background-color: rgba(3,37,65,1);
`;

const HeaderWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0 20px 20px;
`;

const HeaderLeft = styled.div`
    display: flex;
`;

const NavItem = styled.li`
    list-style-type: none;
    margin-left: 20px;
    color: white;
`;

export default function Header() {
    const navigate = useNavigate();

    const setLogin = useState(false);

    const handleLoginClick = () => {
        setLogin(true);
        navigate("/login");
    };

  return (
    <HeaderContainer>
        <HeaderWrap>
            <HeaderLeft>
                <Link to='/'>
                    <img
		                style={{ width: "154px", height: "20px" }}
		                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
		                alt="로고"
                    />
                </Link>
                <Link to='/movie'>
                    <NavItem>영화</NavItem>
                </Link>
                <Link to='/tv'>
                    <NavItem>TV 프로그램</NavItem>
                </Link>
                <Link to='/person'>
                    <NavItem>인물</NavItem>
                </Link>        
            </HeaderLeft>
               <div className='login-wrap'>
                    <button onClick={handleLoginClick}>로그인</button>
                </div> 
        </HeaderWrap>
    </HeaderContainer>
  )
}