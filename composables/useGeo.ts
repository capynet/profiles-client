export default function useGeo() {

    const genPoint = (location: [string, string]) => {
        const lat = location[0]
        const lng = location[1]
        const isLatitude = num => isFinite(num) && Math.abs(num) <= 90;
        const isLongitude = num => isFinite(num) && Math.abs(num) <= 180;

        if (lat && isLatitude(lat) || lng && isLongitude(lng)) {
            return `POINT(${location.reverse().join(' ')})`
        }

        return null
    }

    return {genPoint}
}

