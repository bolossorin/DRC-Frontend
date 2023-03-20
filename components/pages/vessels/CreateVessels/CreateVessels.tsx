import { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Select from "react-select";

//  components
import { Button, DropdownIndicator, H4, Input, Paragraph, PlusMinusInput, Radio } from "../../../common";

import { CreateSessionArgs } from "../../../../graphql/types/session";

interface ICreateVessels {
  setIsOpen: (value: boolean) => void;
  setCountVessels: (value: number) => void;
  createVessels: (sessionsData: CreateSessionArgs[]) => void;
  countVessels: number;
}

const queues: { label: string; value: string }[] = [
  { value: "default", label: "Queue1" },
  { value: "default", label: "Queue2" },
  { value: "default", label: "Queue3" },
];

const dockerImages: { label: string; value: string }[] = [
  { value: "test_vessel:v3.1.1", label: "Image1" },
  { value: "test_vessel:v3.1.1", label: "Image2" },
  { value: "test_vessel:v3.1.1", label: "Image3" },
];

export const CreateVessels = ({ setIsOpen, setCountVessels, countVessels, createVessels }: ICreateVessels) => {
  const [countGPUs, setCountGPUs] = useState(1);
  const [isShowAdvanced, setIsShowAdvanced] = useState(false);
  const [dockerImage, setDockerImage] = useState<typeof dockerImages[0] | null>(dockerImages[0]);
  const [queue, setQueue] = useState<typeof queues[0] | null>(queues[0]);
  const [privileged, setPrivileged] = useState(false);
  const [vessels, setVessels] = useState<CreateSessionArgs[]>([]);

  const handleChangeVesselsCount = (value: number) => {
    if (value > countVessels) {
      setVessels((prev) => [
        ...prev,
        { label: "", n_gpus: countGPUs, queue: queue?.value ?? "", image: dockerImage?.value ?? "", privileged },
      ]);
    } else {
      setVessels((prev) => prev.filter((_, i) => i !== countVessels - 1));
    }
    setCountVessels(value);
  };

  const handleChangeVesselName = (index: number) => (value: string) => {
    setVessels((prev) =>
      prev.map((v, i) => {
        if (i === index) return { ...v, label: value };
        return v;
      })
    );
  };

  useEffect(() => {
    setVessels((prev) =>
      prev.map((v) => ({
        ...v,
        n_gpus: countGPUs,
        image: dockerImage?.value ?? "",
        queue: queue?.value ?? "",
        privileged,
      }))
    );
  }, [countGPUs, dockerImage, queue, privileged]);

  const handleClose = () => {
    setIsOpen(false);
    setCountVessels(0);
  };

  return (
    <div className="fixed z-50 left-0 top-0 h-full w-full">
      <div onClick={handleClose} className="bg-black/40 absolute left-0 top-0 z-10 w-full h-full" />
      <div className="w-full h-full relative z-20 ml-auto max-w-[478px] bg-[#282828] overflow-auto">
        <div className="py-7 px-5 md:px-10 flex items-center border-b border-[#686868]">
          <img className="w-8 mr-3 md:mr-7" src="/cube-green.svg" alt="" />
          <H4 classname="!mb-0">Create Vessels</H4>
          <img
            onClick={handleClose}
            className="w-4 ml-auto opacity-50 hover:opacity-100 cursor-pointer"
            src="/close.svg"
            alt=""
          />
        </div>
        <div className="py-4 md:py-9 px-5 md:px-10">
          <div className="mb-4">
            <H4>1. Name & Quantity</H4>
            <div className="flex items-center gap-3 md:gap-6 my-8">
              <Paragraph classname="!mb-0">Number of Vessels</Paragraph>
              <PlusMinusInput value={countVessels} setValue={handleChangeVesselsCount} />
            </div>
            {vessels.map((vessel, index) => (
              <Input
                key={index}
                classname="mb-6"
                type="text"
                placeholder="Vessel Name"
                value={vessel.label}
                setValue={handleChangeVesselName(index)}
              />
            ))}
          </div>
          <div className="mb-9">
            <H4>2. GPU</H4>
            <div className="flex items-center gap-3 md:gap-6 my-8">
              <Paragraph classname="!mb-0">Number of GPUs</Paragraph>
              <PlusMinusInput value={countGPUs} setValue={setCountGPUs} />
            </div>
            {/* {Array.from(Array(countGPUs).keys()).map((index) => ( */}
            {countGPUs > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <Paragraph classname="!mb-0">Queue</Paragraph>
                <Select
                  className="basic-single light w-full"
                  classNamePrefix="select"
                  components={{ DropdownIndicator } as any}
                  placeholder="Select"
                  options={queues}
                  value={queue}
                  onChange={(option) => setQueue(option)}
                />
              </div>
            )}
            {/* ))} */}
          </div>
          <div className="mb-10">
            <H4>3. Docker</H4>
            <div className="flex items-center gap-3 md:gap-6 my-8">
              <Paragraph classname="!mb-0">Image</Paragraph>
              <Select
                className="basic-single light w-full"
                classNamePrefix="select"
                components={{ DropdownIndicator } as any}
                placeholder="Select"
                options={dockerImages}
                value={dockerImage}
                onChange={(option) => setDockerImage(option)}
              />
            </div>
          </div>
          <div className="mb-4">
            <H4
              onClick={() => setIsShowAdvanced(!isShowAdvanced)}
              classname="flex items-center cursor-pointer transition-all hover:opacity-70 select-none"
            >
              4. Advanced
              <img
                className={cn("w-2.5 ml-4 -rotate-90 transition-all", { "!rotate-90": isShowAdvanced })}
                src={"/arrow.svg"}
                alt=""
              />
            </H4>
            {isShowAdvanced && (
              <div className="flex items-center gap-3 md:gap-6 mt-6 mb-9">
                <Paragraph classname="!mb-0 md:mr-4">Priveleged Access</Paragraph>
                <Radio
                  name="access"
                  label="True"
                  checked={privileged}
                  onChange={() => setPrivileged((prev) => !prev)}
                />
                <Radio
                  name="access"
                  label="False"
                  checked={!privileged}
                  onChange={() => setPrivileged((prev) => !prev)}
                />
              </div>
            )}
          </div>
          <Button size="medium" color="green" onClick={() => createVessels(vessels)}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
