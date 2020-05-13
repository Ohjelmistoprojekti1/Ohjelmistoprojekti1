import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default function Answerer (props) {
    const [vastaaja, setVastaaja] = React.useState({email: ''});

    const handleInputChange = (event) => {
        setVastaaja({[event.target.name]: event.target.value })
        console.log(vastaaja.email)
    }

    const saveVastaaja = (event) => {
        event.preventDefault();
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastaajas', //tähän tulee linkki herokuun
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vastaaja)
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
          let selfHref = JSON.parse(text)._links.self.href;
          console.log(selfHref)
          props.sendHrefToQuiz(selfHref);
        })  
        .catch(function(error) {                        // catch
          console.log('Request failed', error);
        });

    }

    return (
        <form onSubmit={saveVastaaja}>
            <FormControl component="fieldset">
                <InputLabel>Sähköposti</InputLabel>
                <Input name="email" value={vastaaja.email} onChange={e => handleInputChange(e)} variant="outlined" placeholder="sähköposti" aria-describedby="my-helper-text" />
                <Button type="submit">Tallenna</Button>
            </FormControl>
        </form>
    )

}