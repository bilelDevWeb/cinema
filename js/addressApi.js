export async function getAddressFromCoordinates(latitude, longitude) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`;
    const response = await fetch(url);

    if (!response) {
        throw new Error('Erreur lors de la récupération de l’adresse.');
    }

    const data = await response.json();
    if (data.features.length === 0) {
        throw new Error('Aucune adresse trouvée.');
    }

    return data.features[0].properties.label;
}