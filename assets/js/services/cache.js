const cache = {};

function set(key, data)
{
    cache[key] = {
        data: data,
        cacheAt : new Date().getTime()
    }
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        // est ce que quelque chose existe dans le cache
        // et ce qui existe dans le cache à été caché , la date de chache + 15 mins
        // est supérieur à la date de maintenant
        resolve(
            cache[key]
            &&
            cache[key].cacheAt + (15*60*1000) > new Date().getTime()
                ?
                cache[key].data
                :
                null
        );
    })
    return  promise;
}

function invalidate(key)
{
    delete cache[key];
}

export default {
    set,
    get,
    invalidate
}