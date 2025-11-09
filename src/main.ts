import './styles/style.scss';

import JokesManager from './JokesManager/JokesManager';
import WeatherManager from './WeatherManager/WeatherManager';

export const init = () => {
    const jokesManager = new JokesManager();
    const weatherManager = new WeatherManager();

    jokesManager.getNewJoke();
    weatherManager.getWheatherData();
}

if (process.env.NODE_ENV !== "test") {
    console.log("entra en diff test")
    init();
}


