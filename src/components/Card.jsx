import React from "react";
import { Link } from "react-router-dom";
export default function Card({ flags, name, population, region, capital }) {
  return (
    <>
      <Link to={`/${name.common}`}>
        <article className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-verydarkblue">
          <img
            src={flags.svg}
            alt={name.common}
            className="md:h-72 w-full object-cover"
          />
          <div className="p-4">
            <h2 className="font-600 font-bold text-darkgrey text-lg mb-2 dark:text-white">
              {name.common}
            </h2>
            <ul className="flex flex-col item-start justify-start gap-2 text-sm dark:text-white">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Capital : {capital}</li>
            </ul>
          </div>
        </article>
      </Link>
    </>
  );
}
