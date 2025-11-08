interface WeatherManagerInterface {
    getWheatherData(): void
}

type NormalizedData = {
    joke: string,
    score: number,
    date: Date
}

export { NormalizedData, WeatherManagerInterface };
