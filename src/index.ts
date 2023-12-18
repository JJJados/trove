import './app.css';
import popup from './components/Popup.svelte';

const target = document.getElementById('app');

async function render() {
	if (target) {
		new popup({ target });
	}
}

document.addEventListener('DOMContentLoaded', render);
