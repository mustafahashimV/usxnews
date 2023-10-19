const translatte = require('translatte');

const translateText = translatte("Hello", {to: 'en'}).then(res => {
    return (res.text);
}).catch(err => {
    console.error(err);
});