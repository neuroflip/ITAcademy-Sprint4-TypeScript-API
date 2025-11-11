
import './styles/ErrorContainer.scss';

const setError = (text: string) => {
    const errorContainer = document.querySelector('.errorContainer');

    if(errorContainer) {
        if (errorContainer.classList.contains('hidden')) {
            errorContainer.classList.remove('hidden');
        }
        errorContainer.textContent += `‼️ ${text}\r\n`;
    }
}

const clearError = () => {
    const errorContainer = document.querySelector('.errorContainer');

    if(errorContainer) {
        errorContainer.classList.add('hidden');
        errorContainer.textContent = '';
    }
}

export { setError, clearError };