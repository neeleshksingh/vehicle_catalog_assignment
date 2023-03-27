import { useEffect, useState } from 'react'
import './styles/style.css'

const Vehcile = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(()=>{
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2')
        .then(response => response.json())
        .then(data =>{
            const manufacturers = data.Results.map(manufacturer=>{
                const type = typeof manufacturer.VehicleTypes === 'string' ? manufacturer.VehicleTypes.split(',')[0] : "Unknown"
                return{
                    name : manufacturer.Mfr_Name,
                    country : manufacturer.Country,
                    type : type
                }
            })
            setData(manufacturers)
            setLoading(false)
        })
        .catch(e=>{
            console.error(e);
        })
    },[])

    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    const filterData = data.filter((manufacturer)=>{
        const searchValue = search.trim().toLowerCase()
        const name = manufacturer.name.trim().toLowerCase()
        const country = manufacturer.country.trim().toLowerCase()
        const type = manufacturer.type.trim().toLowerCase()
        return(
            name.includes(searchValue) ||   country.includes(searchValue) ||  type.includes(searchValue)
        )
    })

    if(loading){
        return <h1>Loading...</h1>
    }

    return(
        <div className="container flex-col">
            <section>
                <h1>VEHCILE MANUFACTURERS</h1>
            </section>
            <section className='flex-row search'>
                <div className='flex-row search-inp'>
                    <label htmlFor="search">Search</label>
                    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className='flex-row select'>
                    <label htmlFor="filter">Filter by Vehcile Types</label>
                    <select>
                        <option value="">All</option>
                        <option value="">Passenger Car</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                    </select>
                </div>
            </section>
            <section className='table'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((manufacturer, index)=>{
                            return(
                                <tr key={index}>
                                <td>{manufacturer.name}</td>
                                <td>{manufacturer.country}</td>
                                <td>{manufacturer.type}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
export default Vehcile