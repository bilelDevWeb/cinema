export async function getCinemasNearby(address, distance) {
    const addressUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`;
    const addressResponse = await fetch(addressUrl)

    if (!addressResponse.ok) {
        throw new Error('Erreur lors de la récupération des coordonnées GPS.');
    }

    const addressData = await addressResponse.json();
    if(addressData.features.length === 0 ) {
        throw new Error('Adresse non trouvé');
    }

    const { geometry } = addressData.features[0];
    const [longitude, latitude] = geometry.coordinates;

    const cinemasUrl = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation, geom'POINT(${longitude} ${latitude})', ${distance}km)&limit=20`;
    const cinemasResponse = await fetch(cinemasUrl);

    if (!cinemasResponse.ok) {
        throw new Error('Erreur lors de la récupération des cinémas.');
    }

    const cinemasData = await cinemasResponse.json();
    return cinemasData.records.map(record => ({
        nom: record.record.fields.nom,
        adresse: record.record.fields.adresse,
    }));
}