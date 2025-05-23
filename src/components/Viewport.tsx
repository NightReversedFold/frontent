import useInView from "./Observer";
import type { image } from "../types/image";

import { memo, useState } from "react";

import ImageVisualizer from "./ImageVisualizer";
import {backendUrl} from '.././env'

const Box = ({
  key,
  image,
  score,
  setSelected,
}: {
  image: string;
  score:number
  key: number;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      key={key}
      className={`size-45 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onClick={() => {
        setSelected(image);
      }}
    >
      <img src={image} className="cursor-pointer size-full" alt="" />
      <p>{score}</p>
    </div>
  );
};

export default memo(({ arrayImages }: { arrayImages: image[] | null }) => {
  const [selectedImage, setSelected] = useState<string | null>(null);

  return (
    <div>
      <ImageVisualizer
        selectedImage={selectedImage}
        setSelected={setSelected}
      />

      <div className="inline-grid mt-20 grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4 gap-y-8 justify-items-center box-content w-full">
        {arrayImages?.map(({ image_filename, score }, indx: number) => {
          return (
            <Box
              setSelected={setSelected}
              key={indx}
              score = {score}
              image={`${backendUrl}/images/${image_filename}`}
            />
          );
        })}
      </div>
    </div>
  );
});
