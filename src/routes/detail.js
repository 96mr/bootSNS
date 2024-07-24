import React, {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Board from './board.js';

const Detail = () => {
    const navigate = useNavigate();
    const {memberId, boardId} = useParams();

    const [board, setBoard] = useState({}); 

    const detailBoard = () => {
        axios({
            url :`/api/${memberId}/board/${boardId}`,
            method : 'get'
        })
        .then((res)=>{
                console.log(res.data); 
                setBoard(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        detailBoard();
    }, [memberId, boardId]);

    return (
        <>
            <section className="content">
                <div className="pg-header">
                    <Link to="#" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} /></Link>
                    <span className="pg-header-center">게시글</span>
                    <span></span>
                </div>
                    <article className="timeline">			
                       <Board board={board}/>
                    </article>
                    <div className="board_comment">
                        <span>댓글</span>
                        <div className="add-comment">
                                    <form id="comment-form" method="POST">
                                        <input name="bno" value="{boardId}" type="hidden"></input>
                                        <textarea name="content" rows="3" cols="50" placeholder="500자 이내 작성하시오"></textarea>
                                        <button type="button" onClick="{addComment}" >작성</button>
                                    </form>
                        </div>
                        
                        <div className="comment">
                        </div>
                    </div>
            </section>
            
            <div id="modal-like" className="modal">
                <div className="modal-context">
                    <div className="modal-header">
                        <span>좋아요</span>
                        <span className="close"><i className="fas fa-times"></i></span>
                    </div>
                    <div className="modal-list liker">
            
                    </div>
                </div>
            </div>
            
            <div id="board-modal">
                <ul>
                    <li></li>
                    <li><i className="fas fa-trash-alt"></i><span id="board-delete">삭제</span></li>
                    <li><span>기능</span></li>
                </ul>
            </div>

            <div id ="board-popup" className="modal">
                <div className="modal-context">
                </div>
            </div>
        </>
    );
}

export default Detail;