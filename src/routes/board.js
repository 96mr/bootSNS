import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const Board = ({board}) => {
    if (!board) {
        return <div>Loading...</div>;
    }

    const { writer, bno, content, files, likesCnt, replyCnt, regdate } = board;

    if (!writer) {
        return <div>Loading...</div>;
    }

    const { id, profile } = writer;
    if (!profile || !profile.image) {
        return <div>Loading...</div>;
    }
    const { saveName } = profile.image;

    const deleteBoard = () =>{
        axios({
            url :`/api/${board.writer}/board/${board.bno}`,
            method : 'delete'
        })
        .then((res)=>{
                console.log(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    return (
        <>		
            <div className="board" data-bno={board.bno}>
                <Link to={`/${id}/board/${board.bno}`}>
                    <div>
                        <Link to={`/${id}/profile`}>
                            <span className="board-member-image">
                                <img src={`./resources/images/${board.writer.profile?.image?.saveName}`} alt="Profile"/>
                            </span> 
                            <span className="board-member-name">{board.writer.profile?.name}</span> 
                            <span className="board-member-id">{id}</span>
                        </Link>
                        <div className="board-dropdown">
                            <i className="fas fa-angle-down fa-2x"></i>
                        </div>
                    
                                <div className="board-image-list">
                                {board.files && board.files.map((file, index) => (
                                    <span key={index}>
                                        <img src={`./resources/images/${file.save_name}`} alt={`Board ${index}`} />
                                    </span>
                                ))}
                                </div>
                        
                        <div className="board-txt">{board.content}</div>
                    </div>
                    <div className="board-bottom">
                        <div className="board-icon"> 
                            <span onClick="{likeButton}">
                                <span className="unlike"><FontAwesomeIcon icon={regularHeart} size="2x" color="#136BE1" /></span> 
                                <span className="like"><FontAwesomeIcon icon={solidHeart} size="2x" color="#136BE1" /></span>
                            </span>
                            <span className="like-cnt" onClick="{liker_list}">
                                {board.likesCnt}
                            </span>
                        </div> 
                        <div className="board-icon">
                            <Link  to={`/${id}/board/${board.bno}`}>
                                <span><FontAwesomeIcon icon={faCommentAlt} size="2x" color="#136BE1" /></span>
                                <span className="comment-cnt">{board.replyCnt}</span>
                            </Link>
                        </div>
                        <span className='board-regdate'>{board.regdate}</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Board;