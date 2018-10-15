import React, {Component} from 'react'
import {Quote, API_BASE_URL, API_KEY, ApplicationPath} from "med-class";

import {serverInit, getQuotes, getRandomQuote} from './application/server'
import { version } from './version'

import styles from './styles.css'

export class WebComponentQuote extends Component {

    constructor(props) {

        super(props);

        this.container = React.createRef()
        let {locale} = props;

        serverInit(API_BASE_URL, API_KEY);

        if (!locale)
            locale = 'nl';

        this.state = {
            quotes: [],
            quote: null,
            quoteLookup: {},
            locale: locale
        }

        setInterval(() => {
            this.parseRandomQuote();
        }, 12000);

    }

    testClick = () => {
        this.parseRandomQuote()
    }

    componentDidMount() {
        this.props.onLoad && this.props.onLoad(version)
        this.parseRandomQuote()
    }

    componentDidUpdate() {
    }

    parseRandomQuote() {
        getRandomQuote().then(quote => {
            //const dim = this.getDim());
            this.setState({quote})
        })
    }

    getDim(){

        if (!this.container.current)
            return null

        return {
            width: this.container.current.offsetWidth,
            height: this.container.current.offsetHeight
        }
    }

   getFontSize(quote){
       const dim = this.getDim()
       if (!dim || !quote)
           return '1.5em'

       const length = Math.max(quote.quote.length, 50)
       const f1 = 30
       const f2 = 17
       const opp = 36120
       const fs = opp / (length * f1) + (length/f2)
       /*console.log("Opp: " + opp + "Height: " + dim.height + ", Width: " + dim.width + ", Length: " + length + ", fs: " + fs);*/
       return fs + 'px'
   }

    render() {
        const { quote } = this.state

        const qText = quote ? quote.quote : ""
        const aText = quote ? quote.auteur : ""
        const fontSize = this.getFontSize(quote)
        /*const dim = this.getDim()
        console.log('DIM', dim)*/

        return (
            <div ref={this.container} className={styles["quote-container"]} onClick={this.testClick}>
                <div className={styles.quote} style={{fontSize: fontSize}}>{qText}
                    <div className={styles["quotesign-left"]}>&ldquo;</div>
                    <div className={styles["quotesign-right"]}>&bdquo;</div>
                </div>
                <div>{aText}</div>
            </div>
        );
    }
}

WebComponentQuote.propTypes = {
}