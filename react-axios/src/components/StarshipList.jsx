import { useState, useEffect } from 'react'
import { starships_url } from '../global'
import axios from 'axios'
import { useNavigate, Link, Route } from 'react-router-dom'

const StarshipList = (props) => {
    const [starships, setStarships] = useState([])

    useEffect(() => {
        const getStarships = async (URL, total) => {
            const res = await axios.get(URL)
            total = total.concat(res.data.results)
            setStarships(total)
            if (res.data.next) {
                getStarships(res.data.next, total)
            }
        }
        getStarships(starships_url, [])
    }, [])

    let navigate = useNavigate()

    const showShip = (key) => {
        navigate(`${key}`)
    }
    console.log(starships)

    return starships.length != 0 ? (
        <div className="starships">
            <h2>Starship List</h2>
            <div className="grid">
                {starships.map((starship) => (
                    <div key={starship.url.split('/').at(-2)} onClick={() => showShip(starship.url.split('/').at(-2))} className='card'>
                        <h3>{starship.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    ) : <h2>Finding starships...</h2>
}
export default StarshipList