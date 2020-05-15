import React from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'


export default function OpenQuestion(props) {
    const [vastaus, setVastaus] = React.useState({answer: '', kysymys: props.question._links.self.href, vastaaja: props.vastaajaHref});
    const [questionString, setQuestionString] = React.useState(props.question.question);
    const [disabled, setDisabled] = React.useState(true);

    const handleChange = (event) => {
        setVastaus({answer: event.target.value, kysymys: vastaus.kysymys, vastaaja: vastaus.vastaaja});
        setDisabled(false);
    }

    const saveVastaus = (event) => {
        event.preventDefault();
        
          console.log(vastaus);
          fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastauses', //tähän tulee linkki herokuun
              {
                  method:'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(vastaus)
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
          props.incrementQuestionNo();
        })  
        .catch(function(error) {                        // catch
          console.log('Request failed', error);
        });
      
    }
       
    return (
        <div>
            <br></br><br></br><br></br>
            <form onSubmit={saveVastaus}>
                <FormControl component="fieldset">
                    <InputLabel>{questionString}</InputLabel>
                    <Input name="answer" value={vastaus.answer} onChange={e => handleChange(e)} variant="outlined" placeholder={questionString} aria-describedby="my-helper-text" />
                    <Button type="submit" disabled={disabled}>Seuraava</Button>
                </FormControl>
            </form>
        </div>
    );
}
