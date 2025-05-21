import useInView from "./Observer";
import type {image} from "../types/image"

const Box = (
  {key,image}:{
    image:string
    key:number
  }

) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      key={key}
      className={`size-45 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    ><img src= {image} className="size-full" alt="" />

    </div>
  );
};

export default ({arrayImages}:{
  arrayImages:image[] | null
}) => {
  return (
    <div className="mt-20 grid grid-cols-4 gap-y-2 justify-items-center box-content w-full">
      {arrayImages?.map(({image_filename},indx:number) => {
        return <Box key= {indx} image = {`http://127.0.0.1:8000/images/${image_filename}`}/>
        
      })}
    </div>
  );
};
