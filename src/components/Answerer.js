import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from './Radio.js';

export default function Answerer () {
    const [value, setValue] = React.useState({email: ''});
    const [number, setNumber] = React.useState(0);

    const handleInputChange = (event) => {
        setValue({[event.target.name]: event.target.value })
        console.log(value)
    }

    const saveEmail = (event) => {
        event.preventDefault();
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastaajas', //tähän tulee linkki herokuun
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

        setNumber(number + 1);

    }

    if(number < 1) {
    return (
        <form onSubmit={saveEmail}>
            <FormControl component="fieldset">
                <InputLabel>Sähköposti</InputLabel>
                <Input name="email" value={value.email} onChange={e => handleInputChange(e)} variant="outlined" placeholder="sähköposti" aria-describedby="my-helper-text" />
                <Button type="submit">Seuraava</Button>
            </FormControl>
        </form>
    )
    }else{
        return(<div><Radio/></div>
        )
    }
    
}