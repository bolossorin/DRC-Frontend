import { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Select, { components } from "react-select";

//  components
import { Button, DropdownIndicator, H4, Input, Paragraph, PlusMinusInput, Radio } from "../../../common";

import { useQuery } from "@apollo/client";
import { CreateSessionArgs } from "@/graphql/types/session";
import { findImages } from "@/graphql/images/getImagesByName";
import { IQueue } from "@/graphql/types/queues";
import { getQueues } from "@/graphql/queues/getQueues";

interface ICreateVessels {
  setIsOpen: (value: boolean) => void;
  setCountVessels: (value: number) => void;
  createVessels: (sessionsData: CreateSessionArgs[]) => void;
  countVessels: number;
  region: string;
}

const ClearIndicator = (props:any) => {
  const clearValue = () => {
    props.clearValue();
    props.selectProps.onClear && props.selectProps.onClear();
  };

  const innerProps = {
    ...props.innerProps,
    onMouseDown: clearValue,
    onTouchEnd: clearValue
  };

  return <components.ClearIndicator {...props} innerProps={innerProps} />;
};

function useAvailableImages(query: string) {
  const { data } = useQuery<{ available_images: string[] }>(findImages, {
    variables: {
      text: query,
    },
    fetchPolicy: "network-only",
  });
  return data?.available_images
}

function useQueues(computeType: "gpu" | "cpu", region: string) {
  const { data } = useQuery<{ available_queues: IQueue[] }>(getQueues, {
    variables: {
      computeType,
      region
    },
    fetchPolicy: "network-only",
  });
  return data?.available_queues
}

export const CreateVessels = ({ setIsOpen, setCountVessels, countVessels, createVessels, region }: ICreateVessels) => {
  const [countGPUs, setCountGPUs] = useState(1);

  // Docker images
  const [dockerImage, setDockerImage] = useState<string | null>(null);
  const [imageQuery, setImageQuery] = useState("");
  const availableImages = useAvailableImages(imageQuery);

  // Queues
  const [queue, setQueue] = useState<IQueue | null>(null);
  const queues = useQueues(countGPUs > 0 ? "gpu" : "cpu", region);
  const [queueQuery, setQueueQuery] = useState("");

  const [isShowAdvanced, setIsShowAdvanced] = useState(false);
  const [vessels, setVessels] = useState<CreateSessionArgs[]>([{
    label: "",
    n_gpus: countGPUs,
    queue: queue?.queue ?? "",
    image: dockerImage ?? "",
    privileged: false,
    monitor_by_undertaker: true,
  }]);

  // Advanced
  const [privileged, setPrivileged] = useState(false);
  const [monitorByUndertaker, setMonitorByUndertaker] = useState(true);

  // Styles and animation
  const [marginRight, setMarginRight] = useState('mr-[-100%]');
  useEffect(() => {
    setMarginRight('mr-[0%]');
  }, [])

  const handleChangeVesselsCount = (value: number) => {
    if (value > countVessels) {
      setVessels((prev) => [
        ...prev,
        {
          label: "",
          n_gpus: countGPUs,
          queue: queue?.queue ?? "",
          image: dockerImage ?? "",
          privileged,
          monitor_by_undertaker: monitorByUndertaker,
        },
      ]);
    } else if (value < countVessels) {
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
        image: dockerImage ?? "",
        queue: queue?.queue ?? "",
        privileged,
        monitor_by_undertaker: monitorByUndertaker,
      }))
    );
  }, [countGPUs, dockerImage, queue, privileged, monitorByUndertaker]);

  // Reset the queue value if the search result is empty.
  useEffect(() => {
    if (queues !== undefined && queues.length === 0)
      setQueue(null)
  }, [queues])

  // Select the first available docker image by default
  useEffect(() => {
    if (availableImages === undefined)
      return
    if (dockerImage === null)
      setDockerImage(availableImages[0])
  }, [availableImages])

  const handleClose = () => {
    setMarginRight('mr-[-100%]')
    setTimeout(() => {
      setIsOpen(false);
      setCountVessels(1);
    }, 150);
  };

  const getDockerImages = () => {
    if (availableImages === undefined) return []
    return availableImages.map(item => ({
      label: item,
      value: item,
    }))
  }

  const getQueues = () => {
    if (queues === undefined) return []
    return queues.map(item => ({
      label: `${item.queue} (${item.free} free)`,
      value: item.queue,
      free: item.free,
    }))
  }

  return (
    <div className="fixed z-50 left-0 top-0 h-full w-full">
      <div onClick={handleClose} className="bg-black/40 absolute left-0 top-0 z-10 w-full h-full" />
      <div
        className={`w-full h-full relative z-20 max-w-[478px] bg-[#282828] overflow-auto ml-auto ${marginRight} transition-all`}>
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
              <PlusMinusInput value={countVessels} setValue={handleChangeVesselsCount} minValue={1} />
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
              <PlusMinusInput value={countGPUs} setValue={setCountGPUs} minValue={0} />
            </div>
            {queues === undefined || queues.length > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <Paragraph classname="!mb-0">Queue</Paragraph>
                <Select
                  styles={{
                    input: (baseStyles) => ({
                      ...baseStyles,
                      color: 'white',
                    }),
                  }}
                  className="basic-single light w-full"
                  classNamePrefix="select"
                  components={{ DropdownIndicator } as any}
                  placeholder="Select"
                  options={getQueues()}
                  value={queue ? {
                    label: `${queue.queue} (${queue.free} free)`,
                    value: queue.queue,
                    free: queue.free
                  } : undefined}
                  onChange={(option) => setQueue(option ? { queue: option.value, free: option.free } : null)}
                  isSearchable={true}
                  inputValue={queueQuery}
                  onInputChange={(v) => setQueueQuery(v)}
                  isClearable={queueQuery.length > 0 || queue !== undefined}
                  onMenuOpen={() => setQueueQuery(queue ? `${queue.queue} (${queue.free} free)` : '')}
                  onClear={() => setQueueQuery('')}
                />
              </div>
            )}
            {queues !== undefined && queues.length === 0 && countGPUs === 0 &&
              <p>No CPU compute currently available. Ask the MLOPs team to start a cloud instance for you.</p>}
            {queues !== undefined && queues.length === 0 && countGPUs > 0 &&
              <p>No GPU compute currently available. Ask the MLOPs team to start a cloud instance for you.</p>}
          </div>
          <div className="mb-10">
            <H4>3. Docker</H4>
            <div className="flex items-center gap-3 md:gap-6 my-8">
              <Paragraph classname="!mb-0">Image</Paragraph>
              <Select
                styles={{
                  input: (baseStyles) => ({
                    ...baseStyles,
                    color: 'white',
                  }),
                }}
                className="basic-single light w-full"
                classNamePrefix="select"
                components={{ DropdownIndicator, ClearIndicator } as any}
                placeholder="Select"
                options={getDockerImages()}
                value={{ label: dockerImage, value: dockerImage }}
                onChange={(option) => setDockerImage(option?.value || null)}
                isSearchable={true}
                defaultValue={availableImages !== undefined && availableImages.length > 0 ? {
                  label: availableImages[0],
                  value: availableImages[0]
                } : undefined}
                inputValue={imageQuery}
                onInputChange={(v) => setImageQuery(v)}
                isLoading={availableImages === undefined}
                isClearable={imageQuery.length > 0 || dockerImage !== undefined}
                onMenuOpen={() => setImageQuery(dockerImage ? dockerImage : '')}
                onClear={() => setImageQuery('')}
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
              <>
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
                <div className="flex items-center gap-3 md:gap-6 mt-6 mb-9">
                  <Paragraph classname="!mb-0 md:mr-4">Monitor</Paragraph>
                  <Radio
                    name="monitor"
                    label="True"
                    checked={monitorByUndertaker}
                    onChange={() => setMonitorByUndertaker((prev) => !prev)}
                  />
                  <Radio
                    name="monitor"
                    label="False"
                    checked={!monitorByUndertaker}
                    onChange={() => setMonitorByUndertaker((prev) => !prev)}
                  />
                </div>
              </>
            )}
          </div>
          <Button
            size="medium"
            color="green"
            onClick={() => createVessels(vessels)}
            disabled={dockerImage === null || dockerImage === "" || queue === null || queue.queue === ""}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
