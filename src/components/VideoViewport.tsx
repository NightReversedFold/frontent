import { useRef, useEffect, useState } from "react";

import VideoControls from "./VideoPlayer/VideoControls";

export default ({ response }: { response: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  

  const [isFullScreen, setIsFullScreen] = useState(false);

  console.log(response);

  useEffect(() => {
    console.log('-------------------')
    if (videoRef.current && response) {
      videoRef.current.load();
      console.log("Video blob assigned and loaded:", response);
    }
  }, [response]);

  return (
    <div ref={viewportRef} className=" w-full flex justify-center h-full">
      <div
        className={`${
          isFullScreen ? "relative" : "relative"
        } my-20 max-h-200 items-center ${isFullScreen?' ':'w-3/4 '}`}
      >
        <video ref={videoRef}  className="object-cover w-full top-0 left-0 h-full" src={response}>
          Video is not compatible with the browser.
        </video>

        <VideoControls
          video={videoRef}
          viewport={viewportRef}
          setIsFullScreen={setIsFullScreen}
        />
      </div>
    </div>
  );
};
