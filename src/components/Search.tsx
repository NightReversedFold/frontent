import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import axios from "axios";

import { useRef, useState } from "react";
import Viewport from "./Viewport";

const items = [
  "aeroplane",
  "bicycle",
  "bird",
  "boat",
  "bottle",
  "bus",
  "car",
  "cat",
  "chair",
  "cow",
  "diningtable",
  "dog",
  "horse",
  "motorbike",
  "person",
  "pottedplant",
  "sheep",
  "sofa",
  "train",
  "tvmonitor",
] as const;

type submitStatus = "Posted" | "Resolved" | "Error";

import type { image } from "../types/image";
import VideoViewport from "./VideoViewport";

import { backendUrl } from "../env";

type Item = (typeof items)[number];

export default () => {
  const queryFORAI = useRef<HTMLTextAreaElement>(null);

  const [incluyeTodos, setIncluyeTodos] = useState(true);
  const [selectedList, setSelectedList] = useState<Item[]>([]);

  const [arrayOfImages, setArrayOfImages] = useState<image[] | null>(null);

  const [sbStatus, setsbStatus] = useState<submitStatus>("Resolved");
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [backendVideo, setBackendVideo] = useState<File | null | any>(null);

  const handleSubmitForBackendVideo = async () => {
    try {
      const formDt = new FormData();
      formDt.append("file", selectedVideo as File);
      formDt.append("classes", JSON.stringify(selectedList));

      if (queryFORAI.current){
        formDt.append("queryFORAI", queryFORAI.current?.value.toString());
      }

      formDt.append("inclusivo", incluyeTodos.toString());
      
      const res = await axios.post(
        `${backendUrl}/video`,
        formDt,
        {
          responseType: "blob",
        
        }
      );
  
      setsbStatus("Resolved");
      
      console.log(res.data)

      setBackendVideo(URL.createObjectURL(res.data));

      console.log(res);
    } catch(err) {
      console.error(err)
      setsbStatus("Error");
    } finally {
      setSelectedVideo(null);
    }
  };

  const handleSubmitForImageCollection = async () => {
    try {
      const res = await axios.post(`${backendUrl}/query`, {
        classes: selectedList,
        queryFORAI: queryFORAI.current?.value,
        inclusivo: incluyeTodos,
      });

      setsbStatus("Resolved");

      setArrayOfImages(res.data.results);

      console.log(res);
    } catch {
      setsbStatus("Error");
    }
  };

  const toggleIncluyeTodos = () => {
    setIncluyeTodos(!incluyeTodos);
  };

  return (
    <div className="w-full md:max-h-200 mx-10 h-auto">
      <h2 className="text-6xl font-bold">búsqueda</h2>

      <div className=" flex flex-col bg-[#1a1818] rounded-3xl p-5 box-content gap-y-5 border-1 border-[#ffffff4f] mt-5">
        <div className="flex flex-col gap-y-3">
          <h3>¿Qué buscas?</h3>

          <div className="rounded-2xl h-30 bg-[#3d3939] w-full">
            <textarea
              ref={queryFORAI}
              className="rounded-2xl p-2 resize-none size-full"
              name=""
              id=""
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 ">
          <h3>Clase</h3>
          <Listbox
            onChange={(e: Item) => {
              if (selectedList.includes(e)) return;

              setSelectedList((current) => [...current, e]);
            }}
          >
            <div
              className={`
            data-focus:border-2
            px-3 items-center  rounded-2xl min-h-15 p-2  bg-[#3d3939] w-full flex text-[#ffffff80] 
            `}
            >
              {selectedList.length <= 0 ? `Selecciona una clase` : ""}
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {selectedList.map((item, indx) => (
                  <div
                    key={indx}
                    className=" px-2 bg-red-400 rounded-[5px] h-full min-x-25 text-white"
                  >
                    {item}

                    <span className="ml-1">
                      <button
                        onClick={() => {
                          setSelectedList((current) =>
                            current.filter((arItem) => arItem !== item)
                          );
                        }}
                        className="cursor-pointer font-bold"
                      >
                        X
                      </button>
                    </span>
                  </div>
                ))}
              </div>

              <div className="ml-auto mr-1 gap-x-2 flex ">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedList([]);
                  }}
                  className="
                  flex items-center justify-center
                  hover:text-gray-400 cursor-pointer
                  bg-[#00000054] text-slate-400 rounded-full p-2 size-2 box-content"
                  title="Añadir"
                >
                  <span className="text-base">X</span>
                </button>
                <ListboxButton
                  type="button"
                  className=" flex items-center justify-center
                  hover:text-gray-400 cursor-pointer
                  bg-[#00000054] text-slate-400 rounded-full p-2 size-2 box-content"
                  title="Añadir más (mock dropdown)"
                >
                  ▼
                </ListboxButton>
              </div>
            </div>

            <ListboxOptions
              anchor="top"
              className="min-w-20 rounded-2xl bg-[#1f1f1f] h-90 scrollbar-hide"
            >
              {items.map((item, indx) => (
                <ListboxOption
                  key={indx}
                  value={item}
                  className={`${
                    selectedList.includes(item) ? "bg-slate-600" : null
                  }  px-2 py-3 cursor-pointer text-center`}
                >
                  {item}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        <div className="flex items-center space-x-3">
          <div
            onClick={toggleIncluyeTodos}
            className={`w-10 h-6 flex items-center rounded-full cursor-pointer ${
              incluyeTodos ? "bg-red-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                incluyeTodos ? "translate-x-5" : "translate-x-1"
              }`}
            ></div>
          </div>
          <span className="text-sm font-semibold">Incluye todos</span>
        </div>

        <div className="w-full ">
          {(sbStatus === "Resolved" || sbStatus === "Error") && (
            <div className="flex gap-5">
              <button
                type="submit"
                onClick={async () => {
                  setArrayOfImages(null);
                  setsbStatus("Posted");

                  if (selectedVideo) {
                    handleSubmitForBackendVideo();
                    return;
                  }

                  handleSubmitForImageCollection();
                }}
                className="border-[#ffffff4f] border-1 p-2 rounded-2xl cursor-pointer mt-5"
              >
                Submit
              </button>

              <form className="mt-5 py-2 items-center flex  bg-slate-800 opacity-80 px-3 rounded-2xl">
                <div className="flex flex-row items-center">
                  <input
                    accept="video/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setSelectedVideo(file);
                    }}
                    type="file"
                    id="custom-input"
                    hidden
                  />
                  <label
                    htmlFor="custom-input"
                    className="block  text-slate-500 mr-4 py-2 px-4
                              rounded-md border-0 text-sm font-semibold bg-slate-500
                              text-white
                               hover:bg-slate-400 cursor-pointer"
                  >
                    Choose video
                  </label>
                  <label
                    htmlFor="custom-input"
                    className="text-sm  opacity-85 bg-gray-600 text-white p-1 box-content rounded-[10px]"
                  >
                    {selectedVideo ? selectedVideo.name : "selected video"}
                  </label>
                </div>
              </form>
            </div>
          )}
          {sbStatus === "Posted" && (
            <svg
              className="mt-5 animate-spin"
              fill="#ffffff"
              height="40px"
              width="40px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 53 53"
              xml:space="preserve"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M52.785,25.885c0.118-0.174,0.197-0.378,0.186-0.604c-0.037-0.698-0.104-1.397-0.202-2.078 c-0.079-0.547-0.585-0.926-1.132-0.849c-0.547,0.079-0.927,0.585-0.849,1.132c0.09,0.622,0.151,1.261,0.185,1.9 c0.011,0.207,0.098,0.386,0.215,0.54C51.078,26.086,51,26.269,51,26.477c0,11.579-9.421,21-21,21c-10.7,0-19.54-8.05-20.823-18.409 l5.116,5.116c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-6.689-6.689 c0.01-0.505,0.023-1.013,0.068-1.51c0.05-0.55-0.355-1.036-0.906-1.086c-0.537-0.055-1.036,0.356-1.086,0.906 c-0.049,0.545-0.064,1.099-0.074,1.652L0.293,32.77c-0.391,0.391-0.391,1.023,0,1.414C0.488,34.379,0.744,34.477,1,34.477 s0.512-0.098,0.707-0.293l5.408-5.408C8.272,40.383,18.093,49.477,30,49.477c12.683,0,23-10.317,23-23 C53,26.251,52.911,26.053,52.785,25.885z"></path>{" "}
                  <path d="M36.955,6.656c0.592,0.208,1.188,0.448,1.771,0.714c0.135,0.062,0.275,0.09,0.414,0.09c0.38,0,0.743-0.217,0.911-0.585 c0.229-0.503,0.007-1.096-0.495-1.325c-0.639-0.291-1.291-0.554-1.938-0.78c-0.521-0.187-1.092,0.092-1.274,0.612 C36.16,5.903,36.434,6.473,36.955,6.656z"></path>{" "}
                  <path d="M31.363,5.521c0.632,0.04,1.27,0.11,1.897,0.208c0.052,0.008,0.104,0.012,0.154,0.012c0.484,0,0.91-0.353,0.987-0.847 c0.085-0.546-0.289-1.057-0.835-1.142c-0.687-0.106-1.385-0.184-2.077-0.228c-0.542-0.031-1.026,0.383-1.062,0.935 C30.394,5.01,30.812,5.486,31.363,5.521z"></path>{" "}
                  <path d="M43.544,10.427c0.188,0.159,0.417,0.236,0.645,0.236c0.285,0,0.567-0.121,0.765-0.354c0.356-0.423,0.304-1.054-0.118-1.409 c-0.532-0.449-1.089-0.878-1.655-1.274c-0.452-0.317-1.076-0.207-1.393,0.246c-0.316,0.452-0.207,1.076,0.246,1.393 C42.55,9.625,43.059,10.017,43.544,10.427z"></path>{" "}
                  <path d="M47.369,14.669c0.193,0.284,0.508,0.437,0.827,0.437c0.193,0,0.39-0.057,0.563-0.174c0.456-0.311,0.574-0.933,0.263-1.39 c-0.389-0.571-0.811-1.133-1.253-1.671c-0.352-0.427-0.98-0.487-1.408-0.137c-0.426,0.352-0.487,0.981-0.137,1.408 C46.628,13.634,47.014,14.147,47.369,14.669z"></path>{" "}
                  <path d="M49.219,18.001c0.256,0.579,0.488,1.177,0.689,1.776c0.141,0.418,0.53,0.682,0.948,0.682c0.105,0,0.213-0.017,0.318-0.052 c0.523-0.176,0.806-0.743,0.63-1.267c-0.222-0.658-0.476-1.313-0.756-1.948c-0.224-0.504-0.81-0.731-1.319-0.511 C49.225,16.906,48.996,17.496,49.219,18.001z"></path>{" "}
                  <path d="M19.835,7.961c0.156,0,0.314-0.036,0.462-0.113c0.56-0.293,1.142-0.563,1.729-0.805c0.511-0.21,0.755-0.794,0.545-1.305 c-0.209-0.512-0.797-0.758-1.305-0.545c-0.644,0.264-1.281,0.561-1.895,0.881c-0.489,0.256-0.679,0.86-0.424,1.35 C19.126,7.766,19.475,7.961,19.835,7.961z"></path>{" "}
                  <path d="M10.668,15.92c0.162,0.099,0.342,0.146,0.519,0.146c0.338,0,0.667-0.171,0.855-0.48c0.33-0.543,0.688-1.075,1.064-1.583 c0.328-0.444,0.235-1.07-0.208-1.399c-0.444-0.329-1.07-0.234-1.399,0.208c-0.412,0.557-0.805,1.141-1.166,1.735 C10.046,15.018,10.196,15.633,10.668,15.92z"></path>{" "}
                  <path d="M25.461,5.946c0.068,0,0.137-0.007,0.206-0.021c0.618-0.129,1.252-0.232,1.884-0.307c0.549-0.064,0.941-0.561,0.877-1.109 c-0.063-0.547-0.556-0.94-1.109-0.877c-0.691,0.081-1.386,0.194-2.062,0.336c-0.541,0.113-0.887,0.644-0.773,1.184 C24.582,5.622,24.998,5.946,25.461,5.946z"></path>{" "}
                  <path d="M8.539,21.515c0.09,0.025,0.181,0.037,0.27,0.037c0.438,0,0.839-0.289,0.962-0.731c0.17-0.61,0.371-1.22,0.597-1.811 c0.196-0.516-0.062-1.094-0.578-1.291c-0.513-0.196-1.094,0.063-1.291,0.578c-0.247,0.648-0.468,1.317-0.653,1.986 C7.696,20.816,8.008,21.368,8.539,21.515z"></path>{" "}
                  <path d="M14.957,11.423c0.245,0,0.491-0.09,0.684-0.271c0.462-0.433,0.949-0.85,1.45-1.241c0.436-0.34,0.513-0.968,0.173-1.403 c-0.34-0.437-0.968-0.514-1.403-0.173c-0.549,0.428-1.083,0.885-1.587,1.358c-0.403,0.378-0.424,1.011-0.046,1.413 C14.425,11.317,14.69,11.423,14.957,11.423z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          )}
        </div>

        {arrayOfImages && <Viewport arrayImages={arrayOfImages} />}
        {backendVideo && <VideoViewport response={backendVideo} />}

        {sbStatus === "Error" && (
          <p className="text-2xl">Something went wrong; please, try again.</p>
        )}
      </div>
    </div>
  );
};
