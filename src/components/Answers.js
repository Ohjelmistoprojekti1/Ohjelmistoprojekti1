import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Answers() {
    const [answers,
        setAnswer] = React.useState([
        {
            kysymys1: 'hyvää',
            kysymys2: 'tietojenkäsittelyä'
        },
        {
            kysymys1: 'ihan ok',
            kysymys2: 'liiketaloutta'
        }
    ]);
    const [questions,
        setQuestions] = React.useState(['mitä kuuluu?', 'mitä opiskelet?']);
    const [question,
        setQuestion] = React.useState('');

    React.useEffect(() => {
        fetch('') //Tähän tulee sitten linkki herokuun -api/taytetytKyselyt
            .then(response => response.json())
            .then((responseData) => {
                setQuestion(responseData.results[0].question);
            })
    }, [])

    return (
        <div>
            <Table selectable={false}>
                <TableHead>
                <TableRow>
                    <TableCell>Vastaajat</TableCell>
                    {questions.map((item, index) => 
                        <TableCell key={index}>{item}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {answers.map((item, index) => <TableRow key={index}>
                        <TableCell>Vastaaja {index +1 }</TableCell>
                        <TableCell>{item.kysymys1}</TableCell>
                        <TableCell>{item.kysymys2}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>

    );
}
