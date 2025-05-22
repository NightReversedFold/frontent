import { video } from "framer-motion/client";
import { useRef,useEffect } from "react";

export default ({ response }: { response: string }) => {
  console.log(response);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && response) {
      videoRef.current.load(); // Forzamos que el video se recargue
      console.log("Video blob assigned and loaded:", response);
    }
  }, [response]);


  return (
    <div>
      <video ref={videoRef} key={response} controls width={600} src={response}>
        AAAAAAA
      </video>
      <a href={response} download="test.mp4">
        Descargar video procesado
      </a>
    </div>
  );
};
