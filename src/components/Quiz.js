import React from 'react';
import Radio from './Radio.js';
import OpenQuestion from './OpenQuestion';
import Answerer from './Answerer';
import MobileStepper from '@material-ui/core/MobileStepper';
import {makeStyles} from '@material-ui/core/styles';
import Raport from './Raport';

//Asetetaan progressbar keskelle
const useStyles = makeStyles({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
      },
  })

function Quiz() {
    // Lista kysymyksistä
    const [questions, setQuestions] = React.useState([]);
    // Rest-linkki vastaajaan
    const [vastaajaHref, setVastaajaHref] = React.useState('');
    // Käsiteltävän kysymyksen numero (-1 = ei vielä vastaajaa -> vie Answereriin)
    const [questionNo, setQuestionNo] = React.useState(-1);
    const classes = useStyles();


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
            <MobileStepper
                variant="progress"
                steps={questions.length + 1}
                position="static"
                activeStep={questionNo + 1}
                className={classes.container}
            />
            <Answerer sendHrefToQuiz={hrefFromAnswerer}/>
            </div>
        );
    // Jos questionNo > kysymysten määrä -> omien vastausten tarkastelunäkymä 
    } else if (questionNo > (questions.length - 1)) {
        return (
            <Raport/>
        )
    // Jos question.type = radio -> Radio
    } else if (questions[questionNo].type === "radio") {
        return (
        <div>
            <MobileStepper
                    variant="progress"
                    steps={questions.length + 1}
                    position="static"
                    activeStep={questionNo + 1}
                    className={classes.container}
                />
            <Radio question={questions[questionNo]} vastaajaHref={vastaajaHref} incrementQuestionNo={incrementQuestionNo}/>    
        </div>
        )
    // Jos question.type = open -> OpenQuestion
    } else if (questions[questionNo].type === "open") {
        return (
        <div>
            <MobileStepper
                variant="progress"
                steps={questions.length + 1}
                position="static"
                activeStep={questionNo + 1}
                className={classes.container}
            />
            <OpenQuestion question={questions[questionNo]} vastaajaHref={vastaajaHref} incrementQuestionNo={incrementQuestionNo}/>
        </div>
        )
    }
}

export default Quiz;