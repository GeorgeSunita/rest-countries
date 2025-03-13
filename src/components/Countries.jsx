import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import PageNotFound from "./PageNotFound";
import { useNavigate } from "react-router-dom";
import { FaSistrix } from "react-icons/fa6";
export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const regions = [
    { name: "Africa" },
    { name: "America" },
    { name: "Asia" },
    { name: "Europe" },
    { name: "Oceania" },
  ];

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);
  console.log(countries);

  async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchInput}`
      );
      const data = await res.json();
      setCountries(data);
      if (res.status === 404) {
        setNotFound(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function filterRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );

      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterRegion();
  }
  if (notFound === true) {
    return <PageNotFound />;
  }
  return (
    <>
      {!countries ? (
        <h1>Loading...</h1>
      ) : (
        <section className="container mx-auto p-8 ">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <form
              className="max-w-4xl relative flex items-center  md:flex-1"
              autoComplete="off"
              onSubmit={handleSearchCountry}
            >
              <FaSistrix className="absolute bottom-3 left-10 dark:text-white" />
              <input
                className="p-2 bg-white text-darkgrey placeholder-darkgrey w-full outline-none shadow rounded text-center  dark:bg-verydarkblue dark:text-white"
                type="text"
                name="search"
                id="search"
                value={searchInput}
                placeholder="Search for a country.."
                required
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <form onSubmit={handleFilterByRegion}>
              <select
                className="p-2 text-darkgrey bg-white  placeholder-darkgrey outline-none shadow rounded w-52 dark:bg-verydarkblue dark:text:white"
                name="filter-by-region"
                id="filter-by-region"
                onChange={(e) => filterRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-8 ">
            {countries.map((country) => (
              <Card key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
