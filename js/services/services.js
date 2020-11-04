const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Cold not fetch ${url}, status ${res.status}`);
    }

    return res.json();
};

const getZero = function(n) {
    return n >= 0 && n < 10 ? `0${n}` : n;
};


export {postData, getResource, getZero};