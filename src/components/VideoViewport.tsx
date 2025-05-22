import { video } from "framer-motion/m";

export default ({response}:{response:string}) => {
  console.log(response);

  return (
    <div>
      {
        <video controls width={600}>
          <source src={response} type="video/mp4" />
        </video>
      }
    </div>
  );
};
