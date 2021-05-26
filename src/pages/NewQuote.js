import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);

    const history = useHistory();

    useEffect(() => {
        if(status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history]);

    const addQuoteHandler = quoteData => {
        //console.log(quoteData);
        
        sendRequest(quoteData);
        
        //No need to navigae here as we are using useEffect from react hook
        //history.push('/quotes');
    }

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
    );
}

export default NewQuote;
