import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  startLoading,
  stopLoading,
  loginSuccess,
  loginFailure,
} from '../redux/action';

const LoginPageWrap = styled.div`
  margin-top: 10px;
  padding: 20px;
`;

const LoginTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 500px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
`;

const Button = styled.button`
  width: 510px;
  height: 30px;
  border-radius: 20px;
  border: none;
  margin-top: 5px;
  background-color: rgba(3,37,65,1);
  color: white;
   ${({ disabled }) =>
    disabled &&
    `
    background-color: lightgrey;
  `}
  font-size: 16px;
`;

const Error = styled.div`
  color: red;
`;

function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const url = '//localhost:8000/user/login';

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: '',  // 초기 상태에서 빈 문자열로 설정
    password: '',  // 초기 상태에서 빈 문자열로 설정
  });

  const [buttonActivated, setButtonActivated] = useState(false);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 400:
        return 'body 값이 비어 있습니다.';
      case 401:
        return '존재하지 않는 ID입니다.';
      case 402:
        return '비밀번호가 틀렸습니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setUserEmail(value);
      setErrors({
        ...errors,
        email: '',  // 유효성 검사 비활성화
      });
    } else if (name === 'password') {
      setPassword(value);
      setErrors({
        ...errors,
        password: '',  // 유효성 검사 비활성화
      });
    }
  };

  const handleButtonClick = async (event) => {
    if (userEmail !== "" && password !== "") {
      dispatch(startLoading());

      try {
        const response = await axios.post(url, {
          id: userEmail,
          pw: password,
        });

        if (response.data.code === 2000) {
          dispatch(loginSuccess(response.data.userInfo));
          console.log("로그인이 완료되었습니다");
          console.log(response);

          // 로그인 후에 토큰과 id 받아오고, 이를 local Storage에 저장하기
          const accessToken = response.data.result.AccessToken;
          const id = response.data.result.userId;

          localStorage.setItem('token', accessToken);
          localStorage.setItem('id', id);

          console.log('Token and id stored in local storage:', accessToken, id);

        } else {
          dispatch(loginFailure(response.data.code));
          alert('로그인 실패: ' + getErrorMessage(response.data.code));
          console.log(response);
        }
      } catch (error) {
        dispatch(loginFailure(500));
        console.log(error);
        alert('서버 오류가 발생했습니다.');
      } finally {
        setTimeout(() => {
          setButtonActivated(false);
          dispatch(stopLoading());
        }, 1500); // 1.5초 동안 대기
      }
    } else {
      alert('이메일과 비밀번호를 모두 입력하세요.');
      event.preventDefault();
    }
  };

  return (
    <LoginPageWrap>
      <LoginTitle>
        이메일과 비밀번호를
        <br />
        입력해주세요
      </LoginTitle>
      <p>이메일 주소</p>
      <Input type="email" name="email" value={userEmail} onChange={handleChange} />
      <Error>{errors.email && <p className="errorMsg">{errors.email}</p>}</Error>
      <br />
      <p>비밀번호</p>
      <Input type="password" name="password" value={password} onChange={handleChange} />
      <Error>{errors.password && <p className="errorMsg">{errors.password}</p>}</Error>
      <Button disabled={buttonActivated} onClick={(event) => handleButtonClick(event)}>
        확인
      </Button>
      <div className='axios_load'>
        <p>{loading ? '로딩 중...' : '로딩 전'}</p>
      </div>
    </LoginPageWrap>
  );
}

export default LoginPage;
