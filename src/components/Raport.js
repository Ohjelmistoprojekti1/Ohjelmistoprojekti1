import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './Raport.css'

export default function Raport () {
const [vastaaja, setVastaaja] = React.useState('')
const [vastmaara, setVastmaara] = React.useState(0)
const [vastaukset, setVastaukset] = React.useState([])
const [kysymykset, setKysymykset] = React.useState([])
const [num, setNum] = React.useState(0)

React.useEffect(() => {
    getVastmaara();
}, [])

const getVastmaara = () => {
    fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastaajas')
    .then(response => response.json())
    .then(data => setVastmaara(data._embedded.vastaajas.length - 1))
    .catch(err => console.error(err))    
}


if(vastaukset.length === 0){
        fetch('https://ohjelmistoprojektii.herokuapp.com/api/vastaajas')
        .then(response => response.json())
        .then(data => setVastaaja(data._embedded.vastaajas[vastmaara].id))
        .catch(err => console.error(err))

        

    fetch('https://ohjelmistoprojektii.herokuapp.com/api/kysymyses')
        .then(response => response.json())
        .then(data => setKysymykset(data._embedded.kysymyses))
        .catch(err => console.error(err))
}   

const getAnswers = () => {
    fetch(`https://ohjelmistoprojektii.herokuapp.com/api/vastaajas/${vastaaja}/answers`)
        .then(response => response.json())
        .then(data => setVastaukset(data._embedded.vastauses))
        .catch(err => console.error(err))

        setNum(num + 1)
}

const columns1 = [
    
    {
        Header: 'Kysymys',
        accessor: 'question',
        width: 400
    }
    
]

const columns2 = [
    
    {
        Header: 'Vastaus',
        accessor: 'answer',
        width: 400
    }
    
]

if(num === 0) {
    return(
            <div>
                <h1>Kiitos vastaamisesta!</h1>
                <h3>Voit halutessasi tarkastella vastauksiasi</h3>
                <button onClick={getAnswers}>Näytä vastaukset</button>
                </div>
    )
    }else{
        return(
        <div>
            <div>
                <h1>Kiitos vastaamisesta!</h1>
                <h3>Voit halutessasi tarkastella vastauksiasi</h3>
                <button onClick={getAnswers}>Näytä vastaukset</button>
                </div>
            <div className='rowC'>
                <ReactTable defaultPageSize={30} data={kysymykset} columns={columns1} showPagination={false}/>
                <ReactTable defaultPageSize={30} data={vastaukset} columns={columns2} showPagination={false}/>
            </div>
        </div>
        )
    }
}