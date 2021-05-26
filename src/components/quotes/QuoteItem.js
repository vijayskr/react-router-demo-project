import React from 'react';
import { Link } from 'react-router-dom';

import classes from './QuoteItem.module.css';

/*
const DUMMY_QUOTES = [
  {id:'q1', author:'Max', text: 'Learning react is fun!'},
  {id:'q2', author:'Maximilian', text: 'Learning react is Great!'},
];
*/

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
