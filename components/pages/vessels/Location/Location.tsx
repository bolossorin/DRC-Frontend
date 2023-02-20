// libs
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Select from "react-select";
import { useRegion } from "../../../../context/region";
import { getRegions } from "../../../../graphql/regions/getRegions";

// components
import { DropdownIndicator } from "../../../common";

export const Location = () => {
  const router = useRouter();
  const { data } = useQuery<{ available_regions: string[] }>(getRegions);
  const [region, setRegion] = useRegion();

  const options = data?.available_regions?.map((region) => ({ value: region, label: region })) ?? [];

  const handleChangeRegion = (option: { value: string; label: string } | null) => {
    setRegion(option?.value ?? "");
    router.push("/vessels");
  };

  return (
    <Select
      // @ts-ignore
      components={{ DropdownIndicator }}
      className="basic-single location"
      classNamePrefix="select"
      defaultValue={options?.[0]}
      value={region ? { value: region, label: region } : null}
      options={options}
      onChange={handleChangeRegion as any}
    />
  );
};
