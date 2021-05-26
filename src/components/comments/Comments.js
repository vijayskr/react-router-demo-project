import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params.quoteId;

  const {sendRequest, status, data: loadedComments, error} = useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  useEffect (() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const addedCommentHandler = () => {}

    let comments;
    if(status === 'pending')
    {
      comments = <div className='centered'><LoadingSpinner /></div>;
    };

    if(error) {
        return (
            <div className='centered focused'>
                {error}
            </div>
        );
    }

    if(status === 'completed' && (loadedComments && loadedComments.length > 0)) {
        comments =  <CommentsList comments={loadedComments} />;
    }

    if(status === 'completed' && (loadedComments || loadedComments.length === 0)) {
      comments =  <p className='centered'>No Comments were Added yet !!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params.quoteId}
      onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;