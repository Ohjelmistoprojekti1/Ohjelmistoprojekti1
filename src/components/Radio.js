import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('1');
  const [question, setQuestion] = React.useState('');
  
  React.useEffect(() => {
              fetch('') //Tähän tulee sitten linkki herokuun
              .then(response => response.json())
              .then ((responseData) => {
                  setQuestion(responseData.results[0].question);
              })
          }, [])
         
  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const saveAnswer = (answer) => {
    fetch('', //tähän tulee linkki herokuun
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
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}Tähän tulee kysymys</FormLabel>
      <RadioGroup aria-label="question" name="question1" value={value} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
      </RadioGroup>
      <button onClick={saveAnswer}>Tallenna</button>
    </FormControl>
  );
}
