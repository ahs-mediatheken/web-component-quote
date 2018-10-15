
//axios error: https://github.com/ezolenko/rollup-plugin-typescript2/issues/66
import axios from 'axios'
import _ from 'lodash'
import {convertObjectToClass, Quote, ApplicationPath} from "med-class";

let quotes = [],
    quoteLookup = {},
    API_URL,
    API_KEY,
    tableName='quote'

export function serverInit(quoteUrl, apiKey) {
    API_URL = quoteUrl;
    API_KEY = apiKey;
    ApplicationPath.init()
}

export function getQuotes() {

    return new Promise(function(resolve, reject) {
        let url = `${API_URL}${tableName}?transform=1&order[]=quote,asc&token=${API_KEY}`;
        axios.get(url)
            .then(response => {

                let rawQuotes = response.data.quote;
                quotes = rawQuotes.map(rq => convertObjectToClass(rq));
                quoteLookup = _.keyBy(quotes, quote => quote.quoteId);
                resolve({quotes, quoteLookup})
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });

    });
}

export function getRandomQuote(){

    return new Promise(function(resolve, reject) {
        axios.get(ApplicationPath.quoteApiUrl)
            .then(response => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });

    });
}