import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

export default function RadioButtonsGroup(props) {
  const [vastaus, setVastaus] = React.useState({answer: '', kysymys: props.question._links.self.href, vastaaja: props.vastaajaHref});
  const [questionString, setQuestionString] = React.useState(props.question.question);
         
  const handleChange = (event) => {
    setVastaus({answer: event.target.value, kysymys: vastaus.kysymys, vastaaja: vastaus.vastaaja});
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
          <FormLabel component="legend">{questionString}</FormLabel>
          <RadioGroup aria-label="question" name="answer" onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
          <Button type="submit">Seuraava</Button>
        </FormControl>
      </form>
    </div>
);

}