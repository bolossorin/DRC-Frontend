// libs
import { useQuery } from "@apollo/client";
import Select from "react-select";
import { getRegions } from "../../../../graphql/regions/getRegions";

// components
import { DropdownIndicator } from "../../../common";

export const Location = () => {
  const { data } = useQuery<{ available_regions: string[] }>(getRegions);

  const options =
    data?.available_regions?.map((region) => ({ value: region, label: region })) ?? [];

  return (
    <Select
      // @ts-ignore
      components={{ DropdownIndicator }}
      className="basic-single location"
      classNamePrefix="select"
      defaultValue={options?.[0]}
      options={options}
    />
  );
};
