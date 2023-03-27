import { useEffect, useState } from "react";
import "./styles/style.css";

const Vehcile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [select, setSelect] = useState(null);


  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2"
    )
      .then((response) => response.json())
      .then((data) => {
        const manufacturers = data.Results.map((manufacturer) => {
          const type =
            typeof manufacturer.VehicleTypes === "string"
              ? manufacturer.VehicleTypes.split(",")[0]
              : "Unknown";
          return {
            name: manufacturer.Mfr_Name,
            country: manufacturer.Country,
            type: type,
            head: manufacturer.Mfr_CommonName,
            designation: manufacturer.Designation,
            address: manufacturer.Address,
            state: manufacturer.State,
          };
        });
        setData(manufacturers);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);


  const filterData = data.filter((manufacturer) => {
    const searchValue = search.trim().toLowerCase();
    const name = manufacturer.name.trim().toLowerCase();
    const country = manufacturer.country.trim().toLowerCase();
    const type = manufacturer.type.trim().toLowerCase();
    const filtervalue = filter.trim().toLowerCase();
    return (
      (name.includes(searchValue) || country.includes(searchValue)) &&
      (filtervalue === "" || type === filtervalue)
    );
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container flex-col">
      <section>
        <h1>VEHCILE MANUFACTURERS</h1>
      </section>
      <section className="flex-row search">
        <div className="flex-row search-inp">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex-row select">
          <label htmlFor="filter">Filter by Vehcile Types</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Passenger Car">Passenger Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Trailer">Trailer</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
      </section>
      <section className="popup">
              {select && (
                <div>
                  <h2>{select.name}</h2>
                  <p>{select.head}</p>
                  <p>{select.address}</p>
                  <p>{select.state}</p>
                </div>
              )}
            </section>
      <section className="table">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((manufacturer, index) => {
              return (
                <tr key={index} onClick={() => setSelect(manufacturer)}>
                  <td>{manufacturer.name}</td>
                  <td>{manufacturer.country}</td>
                  <td>{manufacturer.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default Vehcile;
