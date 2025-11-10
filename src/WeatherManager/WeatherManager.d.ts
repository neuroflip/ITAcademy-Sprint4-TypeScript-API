interface WeatherManagerInterface {
    getWheatherData(): void
}

type NormalizedData = {
    joke: string,
    score: number,
    date: string
}

export { NormalizedData, WeatherManagerInterface };
