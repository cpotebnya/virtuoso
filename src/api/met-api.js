const MET_API_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

export async function getArtPieces({ query, departmentId }) {
    try {
        const p = Object.fromEntries(
            Object.entries({ 
                q: query,
                departmentId,
            }).filter(([key, value]) => !!value)
        );
        const params = new URLSearchParams(p);
        const url = params.size ? `search?${params.toString()}` : 'objects';
        const res = await fetch(`${MET_API_URL}${url}` )
        const json = await res.json();
        return json;
    } catch(error) {
        console.error(error.message);
    }
}

export async function getSingleArtPiece({ id }) {
    try {
        const res = await fetch(`${MET_API_URL}objects/${id}` )
        const json = await res.json();
        return json;
    } catch(error) {
        console.error(error.message);
    }
}

export async function getArtDepartments() {
    try {
        const res = await fetch(`${MET_API_URL}departments` )
        const json = await res.json();
        return json;
    } catch(error) {
        console.error(error.message);
    }
}