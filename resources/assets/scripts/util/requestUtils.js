function parseQueryStringToDictionary(queryString) {
    const dictionary = {};

    if (!queryString || queryString.length < 2) return dictionary;

    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    }

    const parts = queryString.split('&');

    for (var i = 0; i < parts.length; i++) {
        const p = parts[i];
        const keyValuePair = p.split('=');

        let key = keyValuePair[0];
        let value = keyValuePair.length > 1 ? keyValuePair[1] : undefined;

        key = key.toLowerCase();

        if (value) {
            value = decodeURIComponent(value);
            value = value.replace(/\+/g, ' ');
        }

        dictionary[key] = value;
    }

    return dictionary;
}

function setQueryParams() {
    if (!window.localStorage) return;

    let query = window.localStorage.getItem('query') ? JSON.parse(window.localStorage.getItem('query')) : {};

    const newQuery = parseQueryStringToDictionary(window.location.search);
    query = Object.assign(query, newQuery);
    window.localStorage.setItem('query', JSON.stringify(query));
}

function getQueryParams() {
    const query = window.localStorage.getItem('query') ? JSON.parse(window.localStorage.getItem('query')) : {};
    return query;
}

export { setQueryParams, getQueryParams };
