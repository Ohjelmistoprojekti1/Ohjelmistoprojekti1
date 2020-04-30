import React from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'


export default function OpenQuestion() {
    const [value, setValue] = React.useState({answer: ''});
    const [question, setQuestion] = React.useState('');

    React.useEffect(() => {
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/kysymyses') //Tähän tulee linkki herokuun
        .then(response => response.json())
        .then ((responseData) => {
            setQuestion(responseData._embedded.kysymyses[1].question);
        })
    }, [])

    const handleInputChange = (event) => {
        setValue({[event.target.name]: event.target.value })
        console.log(value)
    }

    const saveAnswer = (event) => {
        event.preventDefault();
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastauses', //tähän tulee linkki herokuun
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }
        )
        .then(function(response) {                      // first then()
            if(response.ok)
            {
              return response.text();         
            }
      
            throw new Error('Something went wrong.');
        })  
        .then(function(text) {                          // second then()
          console.log('Request successful', text);  
        })  
        .catch(function(error) {                        // catch
          console.log('Request failed', error);
        });

    }
       

    return (
        <form onSubmit={saveAnswer}>
            <FormControl component="fieldset">
                <InputLabel>{question}</InputLabel>
                <Input name="answer" value={value.answer} onChange={e => handleInputChange(e)} variant="outlined" placeholder={question} aria-describedby="my-helper-text" />
                <Button type="submit">Tallenna</Button>
            </FormControl>
        </form>
    )
}
