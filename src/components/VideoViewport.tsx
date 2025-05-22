import { video } from "framer-motion/m";

export default (res: string) => {
  console.log(res);

  return (
    <div>
      {
        <video controls width={600}>
          <source src={res} type="video/mp4" />
        </video>
      }
    </div>
  );
};
