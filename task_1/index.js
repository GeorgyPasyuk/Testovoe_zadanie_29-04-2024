import {encoded, translations} from './data.js'


const decoded = () => {
    return encoded.map(obj => {
        const decodedObj = {};
        for (const key in obj) {
            if (key.endsWith('Id') && !["groupId", "service", "formatSize", "ca"].includes(key)) {
                decodedObj[key] = translations[obj[key]];
            } else {
                decodedObj[key] = obj[key];
            }
        }
        return decodedObj;
    });
};

const uniqueIds = new Set();

encoded.forEach(obj => {
    for (let key in obj) {
        if (key.endsWith("Id") && !["groupId", "service", "formatSize", "ca"].includes(key)) {
            uniqueIds.add(obj[key]);
        }
    }
});


const uniqueIdTranslations = [...uniqueIds].map(id => {
    return {
        id,
        translation: translations[id] !== undefined ? translations[id] : "Нет соответствия",
    };
});



console.log(decoded())
console.log(uniqueIdTranslations)
