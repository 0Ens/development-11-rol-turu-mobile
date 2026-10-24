export function addCity(cities, newCity) {
    if (cities.some(city => city.id === newCity.id)){
        return cities
    }


    return [...cities, newCity]

}

export function removeCity(cities, cityId) {
    return cities.filter(city => city.id !== cityId)
}