import React, { useState } from 'react';
import Error from './Error';

function Searcher({saveSearch}) {

    const [searchTerm, saveSearchTerm] = useState('');
    const [error, saveError] = useState(false);

    const searchImage = (e) => {
        e.preventDefault();

        // validate
        if (searchTerm === '') {
            saveError(true);
            return;
        }

        // send the term to the main component
        saveError(false);
        saveSearch(searchTerm);
    }

    return (
        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Loof for an image, example: Coffee or Soccer"
                        onChange={(e) => saveSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        placeholder="Loof for an image, example: Coffee or Soccer"
                        value="Search"
                    />
                </div>
            </div>
            {(error) ? <Error message="Add a search term" /> : null}
        </form>
    );
}

export default Searcher;