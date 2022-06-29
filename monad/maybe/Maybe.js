/**
 * @author Tristan Geiger
 * @description A simple implementation of the Maybe Monad.
 * Chain ist able to unwrap one Layer ob Maybe. Maybe(Maybe(*))
 * @param {*} value
 * @return {{
 * chain: (function(*=): Maybe),
 * getOrElse: (function(*): *),
 * map: (function(*): Maybe,
 * value: *,
 * isNothing: (function(*=): boolean)}} *
 */
const Maybe = value => {
    const local =  {
        isNothing: value => typeof value === "undefined" || value === null,
        map: fn => local.isNothing(value) ? Maybe(null) : Maybe(fn(value)),
        getOrElse: defaultValue => local.isNothing(value) ? defaultValue: value,
        chain: fn  => local.isNothing(local.map(fn).value) ? Maybe(null) : local.map(fn).value,
        value: value
    };
    return local;
};


const test = Maybe(4)
    .map(x => x + 2)
    .chain(x => Maybe(x).map( y => y**2))
    .getOrElse("FallbackValue");

console.log(test);
