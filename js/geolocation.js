export async function getUserLocation() {
    return new Promise((resolue, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error('La géolocalisation n’est pas supportée par votre navigateur.'));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolue({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude, 
                });
            },
            (error) => reject(new Error('Impossible de récupérer votre position.'))
        );
    });
}