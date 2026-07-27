import { JSX, ReactHTMLElement } from "react";

interface featureBoxprops {
  dataVal: {
    svgData: JSX.Element;
    title: string;
    description: string;
  };
}

export const FeatureBox = ({ dataVal }: featureBoxprops) => {
  return (
    <div className="flex flex-col">
      <dt className="flex flex-col gap-4 text-xl font-semibold leading-7 text-gray-900">
        <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-black text-white shadow-md">
          {dataVal.svgData}
        </div>
        {dataVal.title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <p className="flex-auto">{dataVal.description}</p>
      </dd>
    </div>
  );
};
