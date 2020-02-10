import React from 'react';
import ReactDOM from 'react-dom';
import Blaster from './Blaster';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Blaster />, div);
	ReactDOM.unmountComponentAtNode(div);
});
