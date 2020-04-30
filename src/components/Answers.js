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
            kysymys2: 'hyvin'
        },
        {
            kysymys1: 'ihan ok',
            kysymys2: 'ei niin hyvin'
        }
    ]);
    const [questions,
        setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch('https://ohjelmistoprojektii.herokuapp.com/kysymys') //hakee kaikki kysymykset
            .then(response => response.json())
            .then((responseData) => {
                setQuestions(responseData);
            })
    }, [])

    return (
        <div>
            <Table selectable={false}>
                <TableHead>
                <TableRow>
                    <TableCell>Vastaajat</TableCell>
                    {questions.map((item, index) => 
                        <TableCell key={index}>{item.question}</TableCell>
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
