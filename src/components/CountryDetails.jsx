import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CountryDetails() {
  const [countryDetails, setCountryDetails] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountryDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryDetails();
  }, [name]);
  console.log(countryDetails);

  return (
    <>
      <section className="py-10 md:container md:px-10  mx-auto max-w-full ">
        <Link
          to="/"
          className="flex flex-start w-28 bg-white  py-2 px-6 rounded shadow text-verydarkbluetext hover:bg-darkgrey transition-all duration-200 dark:text-white dark:bg-verydarkblue"
        >
          &larr; Back
        </Link>
        {countryDetails.map((country) => (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:place-items-center md:h-screen ">
            <article>
              {" "}
              <img src={country.flags.svg} alt={country.name.common} />
            </article>
            <article>
              {" "}
              <h1 className="font-800 font-bold text-verydarkbluetest text-4xl mb-8 lg:text-6xl dark:text-white">
                {country.name.common}
              </h1>
              <ul className="my-4 flex flex-col items-start justify-start gap-2 dark:text-white">
                <li>Official Name: {country.name.official}</li>
                <li>Population: {country.population.toLocaleString()}</li>
                <li>Region: {country.region}</li>
                <li>Subregion: {country.subregion}</li>
              </ul>
            </article>
            <article className="mt-24">
              <p className="dark:text-white mb-2">
                {" "}
                Currencies:{" "}
                <span>
                  {Object.values(country.currencies)?.map(
                    (currency, index) =>
                      currency.name +
                      `${index === country.currencies.length - 1 ? "" : ","} `
                  )}
                </span>
              </p>
              <p className="dark:text-white mb-2">
                Languages:{" "}
                <span>
                  {Object.values(country.languages)?.map(
                    (language, index) =>
                      language +
                      `${index === country.languages.length - 1 ? "" : ","} `
                  )}
                </span>
              </p>
              {country.borders && (
                <>
                  <h3 className="flex flex-wrap items-start justify-start text-verydarkblue font-bold text-xl mb-2 dark:text-white">
                    {" "}
                    Border Countries:
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {country.borders.map((border, index) => (
                      <li
                        key={index}
                        className="bg-white shadow p-2 rounded text-xs tracking-wide dark:text-verydarkbluetext"
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
