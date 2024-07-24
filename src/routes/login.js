import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import qs from 'qs';

const Login = () => {

	const navigate = useNavigate();

	const [inputs, setInputs] = useState({id :'', password : ''});

	const {id, password} = inputs;
	const [error, setError] = useState('');
	const inputChangeHandler = (e) => {
		setInputs({
			...inputs,
			[e.target.name] : e.target.value
		});
	}

	const onLoginHandler = async (e) =>{
		e.preventDefault();
		
		const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

		const formData ={
			id : id,
			password : password
		}

		try {
            const response = await axios({
                url: "/api/login",
                method: "post",
                data: qs.stringify(formData),
                headers: { 'X-XSRF-TOKEN': csrfToken },
                withCredentials: true
            });

            if (response.status === 200) {
                setIsAuthenticated(true); // 로그인 성공 시 인증 상태 업데이트
                navigate('/home'); // 로그인 성공 후 홈으로 이동
            } else {
                setError('로그인에 실패했습니다.'); // 실패 메시지 설정
            }
        } catch (error) {
            console.error("로그인 실패:", error);
            setError('로그인에 실패했습니다.'); // 실패 메시지 설정
        }
	}

	useEffect(()=>{
        axios.get("/api/login")
            .then((res)=>{
	            if(res.data === 'home'){
					console.log("home");
                    navigate(`/${res.data}`);
                }
            })
    }, []);

    return (
        <section className="content-login">
			<Link to ="/home"><img src="./resources/images/logo.png" width="50px" alt="logo" /></Link>
			<h1>로그인</h1>
			<form onSubmit={onLoginHandler}>
				<Form.Group className="mb-3">
					<Form.Control type="text" name="id" value={id} onChange={inputChangeHandler} autoComplete="off" placeholder="아이디를 입력하세요"/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control type="password" name="password" value={password} onChange={inputChangeHandler} placeholder="비밀번호를 입력하세요"/>
				</Form.Group>
				<Button variant="outline-secondary" type="submit">로그인</Button>
			</form>
			<p>
				<Link to="./find/id">아이디찾기</Link> | <Link to="./find/password">비밀번호찾기</Link><br /> 
                <Link to="./join">회원이 아니십니까?</Link>
			</p>
		</section>
    );
}

export default Login;