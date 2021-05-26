import React, { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from '../hooks/use-http';
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

/*
const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning react is fun!" },
  { id: "q2", author: "Maximilian", text: "Learning react is Great!" },
];
*/
const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if(status === 'pending')
    {
        return(
            <div className='centered'>
                <LoadingSpinner />
            </div>
            );
    }

    if(error) {
        return (
            <div className='centered focused'>
                {error}
            </div>
        );
    }

    if(status === 'completed'
    && (!loadedQuote || loadedQuote.length === 0)) {
        return (<NoQuotesFound />);
    }


  if (!loadedQuote.text) {
    return <p>No Quote Found !!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
