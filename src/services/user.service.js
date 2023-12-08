let data;

const requiredHeaders = ['name', 'city', 'country', 'favorite_sport'];

function validateHeaders(headers) {
    return requiredHeaders.every(header => headers.includes(header));
}


function fileUpload(buffer) {
    try {
        const rows = buffer.toString().split('\n').map((row) => row.split(','));
        data = []
        if (!validateHeaders(rows[0])) {
            throw { message: 'File must contain required headers.' };
        }

        for (let i = 1; i < rows.length; i++) {
            const [name, city, country, favorite_sport] = rows[i];
            data.push({ name, city, country, favorite_sport });
        }

        return { message: 'The file was uploaded successfully.' };
    } catch (error) {
        console.log(error);
        throw { message: error.message || 'Error uploading the file.' };
    }
}

function userSearch(query) {
    if (data && data.length > 0) {
        const filteredData = data.filter((user) =>
            Object.entries(query).every(([key, value]) =>
                user[key] && user[key].toString().toLowerCase().includes(value.toLowerCase())
            )
        );
        return { data: filteredData };
    }
    return { data: [] };
}

module.exports = { fileUpload, userSearch };
