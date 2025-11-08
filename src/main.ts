import './styles/style.scss';

import JokesManager from './JokesManager/JokesManager';
import WeatherManager from './WeatherManager/WeatherManager';

const jokesManager = new JokesManager();
const weatherManager = new WeatherManager();

jokesManager.getNewJoke();
weatherManager.getWheatherData();



