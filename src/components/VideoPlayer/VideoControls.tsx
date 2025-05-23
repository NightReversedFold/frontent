import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { MdOutlineFullscreen } from "react-icons/md";
import { useState, memo } from "react";
import { FaPause } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

import arr from "../../temporal";

export default memo(
  ({
    video,
    viewport,
    setIsFullScreen,
  }: {
    video: React.RefObject<HTMLVideoElement | null>;
    viewport: React.RefObject<HTMLDivElement | null>;
    setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [playing, setIsPlaying] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      getFormatedTimeStamps();

      const handleFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement !== null;

        setIsFullScreen(isFullscreen);
        setFullScreen(isFullscreen);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.current!.currentTime / video.current!.duration);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      video.current!.addEventListener("timeupdate", handleTimeUpdate);

      playing ? video.current?.play() : video.current?.pause();
      fullScreen
        ? viewport.current!.requestFullscreen().then(() => {
            video.current!.controls = false;
          })
        : document.fullscreenElement
        ? document.exitFullscreen()
        : null;

      if (video.current) {
        video.current.controls = false;
      }

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      };
    }, [playing, fullScreen]);

    return (
      <div
        className={` ${
          video.current?.width
        } h-full absolute bottom-0 left-0 flex flex-col   size-full transition duration-100 ${
          isHover ? " opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => {
          if (isHover) {
            return;
          }
          setIsHover(true);
        }}
        onMouseLeave={() => {
          if (!isHover) {
            return;
          }

          setIsHover(false);
        }}
      >
        <div
          onClick={() => setIsPlaying((current) => !current)}
          className=" w-full h-12/1 "
        ></div>
        <div className="w-full h-1/13 bg-slate-800/50 flex justify-center items-center gap-2 py-5 ">
          {playing ? (
            <FaPause
              className="cursor-pointer z-9999"
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlay
              className="cursor-pointer z-9999999"
              onClick={() => {
                setIsPlaying(true);
              }}
            />
          )}

          <div className="w-3/4 h-full flex justify-center items-center">
            <span>{formatTime(video.current?.currentTime || 0)}</span>

            <div className="relative w-130 mx-4 h-2 z-10 flex items-center">
              <input
                type="range"
                min={0}
                max={1}
                value={currentTime || 0}
                step="0.00001"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsPlaying(false);

                  video.current!.currentTime =
                    video.current!.duration * Number(e.target.value);

                  setCurrentTime(Number(e.target.value));
                  console.log(
                    Number(e.target.value),
                    video.current!.duration * Number(e.target.value)
                  );
                }}
                className=" absolute w-full z-999 opacity-0 cursor-pointer"
              />
              <div className=" absolute w-full bg-gray-200 h-2 rounded">
            
                <div
                  className="w-2/4 h-full bg-sky-500 rounded relative flex items-center"
                  style={{ width: `${currentTime * 100}%` }}
                >
                  <span>
                    <FaCircle className="absolute -top-1 -right-1" />
                  </span>
                </div>
              </div>
            </div>

            <span>{formatTime(video.current?.duration || 0)}</span>
          </div>

          <MdOutlineFullscreen
            size={35}
            className="cursor-pointer"
            onClick={() => {
              setFullScreen((current) => !current);
            }}
          />
        </div>
      </div>
    );
  }
);

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const getFormatedTimeStamps = () => {
  let r = 0;
  let zx = {};

  Object.values(arr.holabebe).forEach((element) => {
    element.forEach((x) => {
      r = r + 1;
      if (!zx[x[2]]) {
        zx[x[2]] = {
          timeStamps: [],
        };
      }
      zx[x[2]].timeStamps.push(x[0]);
    });
  });

  console.log(zx);

  return zx;
};
