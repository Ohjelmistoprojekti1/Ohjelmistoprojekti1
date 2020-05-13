import React from 'react';
import Radio from './Radio.js';
import OpenQuestion from './OpenQuestion';
import Answerer from './Answerer';

function Quiz() {
    // Lista kysymyksistä
    const [questions, setQuestions] = React.useState([]);
    // Rest-linkki vastaajaan
    const [vastaajaHref, setVastaajaHref] = React.useState('');
    // Käsiteltävän kysymyksen numero (-1 = ei vielä vastaajaa -> vie Answereriin)
    const [questionNo, setQuestionNo] = React.useState(-1);

    // Hakee kysymykset kerran
    React.useEffect(() => {
        fetchQuestions();
    }, [questionNo])

    // Funktio hakee kysymykset rajapinnasta
    const fetchQuestions = () => {
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/kysymyses') //Tähän tulee sitten linkki herokuun
            .then(response => response.json())
            .then ((responseData) => {
            setQuestions(responseData._embedded.kysymyses)
                })
    }

    // Funktio lähettää Answerer komponentista linkin vastaajaan backissa
    // Samalla questionNo kasvatetaan yhdellä, koska nyt on vastaaja
    const hrefFromAnswerer = (vastaaja) => {
        setVastaajaHref(vastaaja);
        incrementQuestionNo();
    }

    // Kasvatetaan questionNo yhdellä aina kun kysymykseen on vastattu
    const incrementQuestionNo = () => {
        setQuestionNo(questionNo + 1);
        console.log("qNo: " + questionNo + ", qsLen: " + questions.length)
    }
    
    // Jos questionNo = -1 mennään Answereriin
    if (questionNo === -1) {
        return (
            <div>
            <br></br><br></br>
            <Answerer sendHrefToQuiz={hrefFromAnswerer}/>
            </div>
        );
    // Jos questionNo > kysymysten määrä -> kiitos 
    // TODO: omien vastausten tarkastelu
    } else if (questionNo > (questions.length - 1)) {
        return <div><br></br><br></br><br></br><h1>Kiitos vastaamisesta!</h1></div>;
    // Jos question.type = radio -> Radio
    } else if (questions[questionNo].type === "radio") {
        return <Radio question={questions[questionNo]} vastaajaHref={vastaajaHref} incrementQuestionNo={incrementQuestionNo}/>
    // Jos question.type = open -> OpenQuestion
    } else if (questions[questionNo].type === "open") {
        return <OpenQuestion question={questions[questionNo]} vastaajaHref={vastaajaHref} incrementQuestionNo={incrementQuestionNo}/>
    }
}

export default Quiz;