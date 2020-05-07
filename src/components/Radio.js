import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import OpenQuestion from './OpenQuestion';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState({answer: ''});
  const [question, setQuestion] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [qnumber, setQnumber] = React.useState(0);
  const [fnumber, setFnumber] = React.useState(0);
  
  React.useEffect(() => {
      fetch('https://ohjelmistoprojektii.herokuapp.com/api/kysymyses') //Tähän tulee sitten linkki herokuun
          .then(response => response.json())
          .then ((responseData) => {
          setQuestions(responseData._embedded.kysymyses)
          setQuestion(responseData._embedded.kysymyses[qnumber].question);
              })
    }, [fnumber])
         
  const handleChange = (event) => {
    setValue({[event.target.name]: event.target.value });
  }

  const saveAnswer = (event) => {
  event.preventDefault();
  
    console.log(value);
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

  if(questions.length > qnumber) {
    setQnumber(qnumber + 1);
    
    }else{
      setQnumber(null)
    }

  if(questions.length - 2 > qnumber) {
    setFnumber(fnumber + 1);
  }else{
    setFnumber(null);
  }
  console.log(qnumber, fnumber);
}

  
if(questions.length > qnumber) {
    return (
    <form onSubmit={saveAnswer}>
      {/*{questions.map(question => ( */}
      <FormControl component="fieldset">
        {/*<FormLabel component="legend">{question.question}</FormLabel>*/}
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup aria-label="question" name="answer" onChange={handleChange}>
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
        <Button type="submit">Seuraava</Button>
      </FormControl>
      {/*}))}*/}
    </form>
  );
}else{
  return(
    <div><OpenQuestion/></div>
  );
}


}