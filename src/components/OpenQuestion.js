import React from 'react';

export default function OpenQuestion() {
    const [answer, setAnswer] = React.useState('');
    const [question, setQuestion] = React.useState('');

    React.useEffect(() => {
        fetch('https://ohjelmistoprojektii.herokuapp.com/kysymys') //Tähän tulee linkki herokuun
        .then(response => response.json())
        .then ((responseData) => {
            setQuestion(responseData[1].question);
        })
    }, [])

    const inputChanged = (event) => {
        setAnswer(event.target.value);
    }

    const saveAnswer = (answer) => {
        fetch('https://ohjelmistoprojektii.herokuapp.com/vastaus', //tähän tulee linkki herokuun
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answer)
            }
        )

    }
       

    return (
        
        <div>
            <p>{question}</p>
            <input type="text" size="100" value={answer} onChange={inputChanged} />
            <button onClick={saveAnswer}>Tallenna</button>
        </div>
    )
}
