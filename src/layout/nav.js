import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faSearch, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBell, faUserCircle } from '@fortawesome/free-regular-svg-icons';

const Navigation = () => {
    const [member, setMember] = useState(null); // 로그인한 유저의 정보를 저장할 상태
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 로그인 상태 확인 API 호출
        axios.get('/api/checkSession', { withCredentials: true })
            .then(response => {
                // 로그인 성공 시, 사용자 정보 설정
                setMember(response.data); // 서버에서 사용자 정보를 반환한다고 가정
            })
            .catch(() => {
                setMember(null); // 로그인 실패 시, 사용자 정보를 null로 설정
            })
            .finally(() => {
                setLoading(false); // 로딩 완료
            });
    }, []);

    return ( 
        <Navbar className="flex-column" fixed="top">
            <Navbar.Brand>
                <Link to="/home">
                    <img src="./src/images/logo.png" width="50" alt="logo" />
                </Link>
            </Navbar.Brand>
            <Nav.Link>
                <Link to="/home">
                    <FontAwesomeIcon icon={faHome} size="2x" color="#136BE1" /><span className="nav-text">홈</span>
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/browse">
                    <FontAwesomeIcon icon={faSearch} size="2x" color="#136BE1" /><span className="nav-text">검색</span>
                </Link>
            </Nav.Link>
            {!member && (
                <>
                    <Nav.Link>
                        <Link to="/login">
                            <FontAwesomeIcon icon={faSignInAlt} size="2x" color="#136BE1" /><span className="nav-text">로그인</span>
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/join">
                            <span className="nav-text">회원가입</span>
                        </Link>
                    </Nav.Link>
                </>
            )}
            {member && (
                <>
                    <Nav.Link>
                        <Link to={`/${member}/profile`}>
                            <FontAwesomeIcon icon={faUserCircle} size="2x" color="#136BE1" /><span className="nav-text">프로필</span>
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/settings">
                            <FontAwesomeIcon icon={faCog} size="2x" color="#136BE1" /><span className="nav-text">설정</span>
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/logout">
                            <FontAwesomeIcon icon={faSignOutAlt} size="2x" color="#136BE1" /><span className="nav-text">로그아웃</span>
                        </Link>
                    </Nav.Link>
            
                    <Nav.Link>
                        <Link to="/alarms">
                            <FontAwesomeIcon icon={faBell} size="2x" color="#136BE1" /><span className="nav-text">알림</span><span id="alarm-count"></span>
                        </Link>
                    </Nav.Link>
                </>
            )}
        </Navbar>
    );
}
export default Navigation;