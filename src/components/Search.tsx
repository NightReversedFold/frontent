import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import axios from "axios";

import {useRef, useState } from "react";

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
] as const;

type Item = (typeof items)[number];

export default () => {
  
  const [incluyeTodos, setIncluyeTodos] = useState(true);
  const [selectedList, setSelectedList] = useState<Item[]>([]);
  const queryFORAI = useRef<HTMLTextAreaElement>(null)

  const toggleIncluyeTodos = () => {
    setIncluyeTodos(!incluyeTodos);
  };

  return (
    <div className="w-200 mx-10">
      <h2 className="text-6xl font-bold">búsqueda</h2>

      <div className=" flex flex-col bg-[#1a1818] rounded-3xl p-5 box-content gap-y-5 border-1 border-[#ffffff4f] mt-5">
        <div className="flex flex-col gap-y-3">
          <h3>¿Qué buscas?</h3>

          <div className="rounded-2xl h-30 bg-[#3d3939] w-full">
            <textarea
              ref = {queryFORAI}
              className="rounded-2xl p-2 resize-none size-full"
              name=""
              id=""
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 "  >
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
                {selectedList.map((item,indx) => (
                  <div key={indx} className=" px-2 bg-red-400 rounded-[5px] h-full min-x-25 text-white">
                    {item}

                    <span className="ml-1">
                      <button
                        onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

              <div className="ml-auto mr-1 gap-x-2 flex " >
                <button

                  type="button"
                  onClick={
                    () => {
                      setSelectedList([])
                    }
                  }   
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

        <div className="w-full">
          <button
            type="submit"
            onClick={async ()=>{

              try {
                const res = await axios.post("http://127.0.0.1:8000/",{
                classes: selectedList,
                queryFORAI: queryFORAI.current?.value,
                inclusivo:incluyeTodos

              })

              console.log(res)

              } catch{

              }
             
            
            }}
            className="border-[#ffffff4f] border-1 p-2 rounded-2xl cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
