import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";

type QueryKeyGeocoding = ["Geocoding", { coordinates: string }];

const queryFunction = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyGeocoding>) => {
  const { coordinates: coordinatesQuery } = queryKey[1];

  const { data: response } = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${coordinatesQuery}&key=a6a796cee189462397bba6adc2f87dac&language=en&pretty=1`
  );

  if (response) {
    const { results } = response;
    const { suburb } = results[0] && results[0]?.components;

    if (suburb != "" && results[0]?.formatted) {
      return `${suburb}, ${results[0]?.formatted}`;
    } else {
      return results[0]?.formatted;
    }
  }
};

const useGeocodingQuery = ({
  options,
  ...queryKeyParams
}: QueryKeyGeocoding[1] & { options?: any }) => {
  const queryKey: QueryKeyGeocoding = ["Geocoding", { ...queryKeyParams }];

  return useQuery(queryKey, queryFunction, options);
};

export { useGeocodingQuery };
