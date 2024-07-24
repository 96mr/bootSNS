import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Board from './board.js';

const Home = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10); // 페이지 크기 설정
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        loadMoreData();
    }, []);

    useEffect(() => {
        if (hasMore && page > 0) {
            loadMoreData();
        }
    }, [page]);

    const loadMoreData = () => {
        axios.get(`http://localhost:8080/api/home?page=${page}&size=${size}`, {
                withCredentials: true, 
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            })
            .then((res) => {
                console.log(res.data);
                setList(prevList => [...prevList, ...res.data.content]);
                setHasMore(!res.data.last); // 마지막 페이지 여부 설정
            })
            .catch((error) => {
                console.error("Error fetching home data:", error);
            });
    };

    const lastElementRef = useRef();

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (lastElementRef.current) observer.current.observe(lastElementRef.current);
    }, [hasMore]);

    return ( 
        <div className="content">
            <div className="pg-header">
                <span className="pg-header-center">타임라인</span>
                <span className="pg-header-right">
                    <Link to="/write"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                </span>
            </div>
            <article className="timeline">
                {list.length > 0 ? (
                    list.map((board, index) => (
                        <Board board={board} key={index} />
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </article>
            <div ref={lastElementRef} />
        </div>
    );
}
export default Home;