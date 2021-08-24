import { getNodeValue } from './helpers.js'
import { getPins, removePins } from './pins.js'

const ANY = 'any'


export function filter(rawData, config) {
    let filteredData = rawData
    console.log(config);
    if (config.type !== ANY) {
        filteredData = filteredData.filter((it) => it.offer.type === config.type)
    }
    if (config.price !== ANY) {
        filteredData = filteredData.filter((it) => it.offer.price === config.price)
    }
    if (config.rooms !== ANY) {
        filteredData = filteredData.filter((it) => it.offer.rooms === config.rooms)
    }
    if (config.guests !== ANY) {
        filteredData = filteredData.filter((it) => it.offer.guests === config.guests)
    }

    return filteredData
}

export function setFiltersListener(data, filteredData) {

    const filterFormElement = document.querySelector('.map__filters')

    filterFormElement.addEventListener('change', (e) => {
        filteredData = filter(data, {
            type: getNodeValue('#housing-type'),
            price: getNodeValue('#housing-price'),
            rooms: getNodeValue('#housing-rooms'),
            guests: getNodeValue('#housing-guests'),
            wifi: getNodeValue('#filter-wifi', 'checked'),
            dishwasher: getNodeValue('#filter-dishwasher', 'checked'),
            parking: getNodeValue('#filter-parking', 'checked'),
            washer: getNodeValue('#filter-washer', 'checked'),
            elevator: getNodeValue('#filter-elevator', 'checked'),
            conditioner: getNodeValue('#filter-conditioner', 'checked')
        })
        removePins()
        getPins(filteredData)
    })
}

