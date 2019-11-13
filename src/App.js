import React, { useState, useEffect } from 'react';
import Searcher from './components/Searcher';
import ImagesList from './components/ImagesList';

function App() {

	const [search, saveSearch] = useState('');
	const [images, saveImages] = useState([]);
	const [actualPage, saveActualPage] = useState(1);
	const [totalPages, saveTotalPages] = useState(1);

	useEffect(() => {
		const consultAPI = async () => {

			if (search === '') return;

			const imagesPerPage = 30;
			const key = '';
			const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`;

			const response = await fetch(url);
			const result = await response.json();

			saveImages(result.hits);

			// calculate the total pages
			const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
			saveTotalPages(calculateTotalPages);

			// move screen to the top
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({behavior: 'smooth', block: 'start'});
		}
		consultAPI();

	}, [search, actualPage]);

	const previewPage = () => {
		let newActualPage = actualPage - 1;

		// put in the state
		saveActualPage(newActualPage);
	}

	const nextPage = () => {
		let newActualPage = actualPage + 1;

		// put in the state
		saveActualPage(newActualPage);
	}

	return (
		<div className="app container">
			<div className="jumbotron">
				<p className="lead text-center">Image Finder</p>
				<Searcher
					saveSearch={saveSearch}
				/>
			</div>
			<div className="row justify-content-center">
				<ImagesList
					images={images}
				/>
				{/* &laquo; (left arrow) and &raquo; (right arrow) */}
				{(actualPage === 1) ? null : (<button onClick={previewPage} type="button" className="btn btn-info mr-1">&laquo; Preview</button>)}
				{(actualPage === totalPages) ? null : (<button onClick={nextPage} type="button" className="btn btn-info">Next &raquo;</button>)}
			</div>
		</div>
	);
}

export default App;
