import { video } from "framer-motion/m";

export default (res: any) => {
  console.log(res);

  return (
    <div>
      {
        <video controls width={600}>
          <source src={URL.createObjectURL(res.blob())} type="video/mp4" />
        </video>
      }
    </div>
  );
};
