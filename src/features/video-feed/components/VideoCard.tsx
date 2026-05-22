"use client";

import Link from "next/link";
import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  MouseEvent,
} from "react";

import {
  CommentIcon,
  LikeSolidIcon,
  MusicIcon,
  MutedIcon,
  ShareSolidIcon,
  UnmutedIcon,
} from "~/components/icons";

type VideoCardProps = {
  data: {
    id: string;
    authorName: string;
    authorAvatarUrl: string;
    videoUrl: string;
    description: string;
    likesCount: number;
    shareCount: number;
    commentsCount: number;
  };

  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoCard = forwardRef<HTMLVideoElement, VideoCardProps>(
  ({ data, isMuted, setIsMuted }, ref) => {
    const [videoProgress, setVideoProgress] = useState(0);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(data.likesCount);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const internalRef = useRef<HTMLVideoElement | null>(null);

    // expose internal video element to parent ref
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    const handleVideoProgressBar = (e: MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const progressBarWidth = rect.width;

      internalRef.current.currentTime =
        (clickPosition / progressBarWidth) * internalRef.current.duration;
    };

    const handleTimeUpdate = () => {
      if (!internalRef.current) return;

      const current = internalRef.current.currentTime;
      const duration = internalRef.current.duration;

      if (duration) {
        setVideoProgress(Math.floor((current / duration) * 100));
      }
    };

    const handleMuteToggle = () => {
      if (!internalRef.current) return;

      setIsMuted((prev) => {
        const newState = !prev;
        internalRef.current!.muted = newState;
        return newState;
      });
    };

    const handlePlayPauseToggle = () => {
      if (!internalRef.current) return;

      const video = internalRef.current;

      // reset animation
      setShowPlayIcon(false);

      requestAnimationFrame(() => {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }

        setShowPlayIcon(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setShowPlayIcon(false);
        }, 450);
      });
    };

    const handleLikeToggle = () => {
      if (isLiked) {
        setLikesCount((prev) => prev - 1);
      } else {
        setLikesCount((prev) => prev + 1);
      }

      setIsLiked(!isLiked);
    };

    useEffect(() => {
      const video = internalRef.current;
      if (!video) return;

      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, []);

    return (
      <div className="relative flex flex-row justify-center items-center lg:p-6 lg:mx-auto h-[calc(100vh-60px)] transition-[margin,width,padding] duration-300 linear overflow-hidden snap-start snap-center scroll-snap-stop-always lg:pe-[240px] bg-black lg:bg-transparent">
        <div className="lg:mx-auto relative lg:flex lg:justify-center lg:items-end w-full h-full lg:max-w-[calc(76.25px + 56.25vh)] lg:gap-4">
          <div className="relative box-border bg-cover h-full cursor-pointer lg:max-h-[calc(100vh-92px)]">
            {/* Video */}
            <div className="max-h-full w-full h-full visible group/video">
              <div
                className="rounded-2xl w-full h-full overflow-hidden relative bg-[rgba(22,24,35,0.06)] bg-cover bg-no-repeat bg-center aspect-[9/16]"
                onClick={handlePlayPauseToggle}
              >
                <video
                  muted={isMuted}
                  loop
                  src={data.videoUrl}
                  ref={internalRef}
                  className="h-full w-full object-contain"
                />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className={`flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-500 ease-out ${showPlayIcon ? "opacity-100 scale-100" : "opacity-0 scale-150"}`}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-16 h-16 p-4"
                      >
                        <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-16 h-16 p-4"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Top controls */}
              <div className="absolute left-0 top-0 right-0 z-10 rounded-b-2xl">
                <div className="p-1 flex flex-row justify-between opacity-0 transition-opacity duration-300 rounded-t-2xl opacity-100 lg:opacity-0 lg:group-hover/video:opacity-100 lg:group-hover/video:bg-[linear-gradient(0deg,rgba(18,18,18,0)_0%,rgba(12,12,12,0.2)_100%)]">
                  <div className="flex h-10 justify-center items-center">
                    <button
                      onClick={() => {
                        handleMuteToggle();
                      }}
                      className="w-10 h-10 p-2 cursor-pointer"
                    >
                      {isMuted ? <MutedIcon /> : <UnmutedIcon />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute z-[1] lg:bottom-0 bottom-2 right-0 left-0 px-3 pb-4 max-h-[50%] flex flex-col text-white/90 font-medium transition-opacity duration-300 justify-end lg:rounded-b-2xl bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 my-2 text-sm font-semibold text-[#f6f6f6]">
                  @{data.authorName}
                </div>

                <div className="max-h-[50%] overflow-y-auto overflow-behavior-y-contain">
                  <div className="whitespace-pre-wrap w-full max-h-[21px] overflow-y-hidden overflow-ellipsis line-clamp-1">
                    <div className="whitespace-pre-wrap w-full max-h-[21px] overflow-y-hidden overflow-ellipsis line-clamp-1">
                      <h1 className="text-sm leading-[18px] whitespace-pre-wrap break-words">
                        <span className="font-normal mr-1">
                          {data.description}
                        </span>
                      </h1>
                    </div>
                    {/* <button className="expand-btn">more</button> */}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute left-0 right-0 lg:bottom-0 bottom-1 z-10">
                <p></p>
                <div
                  onClick={handleVideoProgressBar}
                  className="relative h-[max(4px,16px)] w-full group/progress"
                >
                  <div
                    className="absolute left-1/2 z-[1] opacity-0 bg-white rounded-full shadow-[0_0_1px_1px_rgba(0,0,0,0.15)] cursor-grab transition-[transform,opacity] duration-150 ease-in-out h-[12px] w-[12px] translate-y-[calc(50%+2px)] group-hover/progress:translate-y-[calc(50%+1px)] group-hover/progress:opacity-100"
                    style={{
                      left: `${videoProgress}%`,
                    }}
                  />

                  <div className="flex absolute left-0 right-0 -bottom-1 h-full lg:[clip-path:inset(0px_round_0px_0px_16px_16px)]">
                    <div
                      className="w-full absolute bottom-0 translate-y-1/3 left-0 origin-left bg-primary z-10 transition-[height] duration-150 ease-in-out h-[4px] group-hover/progress:h-[6px]"
                      style={{
                        transform: `scaleX(${videoProgress / 100})`,
                      }}
                    />
                    <div className="w-full self-end bg-white/40 transition-[height] duration-150 ease-in-out h-[4px] group-hover/progress:h-[6px] mb-[-1px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="mb-4 lg:flex lg:flex-col lg:items-center lg:gap-4 lg:static absolute right-0 bottom-6 px-2 py-4">
            {/* Avatar */}
            <div className="relative">
              <Link href="/profile">
                <Image
                  src={data.authorAvatarUrl}
                  alt="avatar"
                  width={48}
                  height={48}
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover mb-2 lg:mb-0"
                />
              </Link>
            </div>

            {/* Like */}
            <button
              onClick={handleLikeToggle}
              className="flex flex-col items-center cursor-pointer mb-1 lg:mb-0"
            >
              <span
                className={`flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full transition-all duration-200 lg:bg-[rgba(22,24,35,0.06)]"}`}
              >
                <LikeSolidIcon
                  className={`transition-all duration-200 lg:h-6 lg:w-6 h-8 w-8 ${isLiked ? "text-red-500" : "lg:text-black text-white"}`}
                />
              </span>

              <strong className="mt-1 text-[12px] font-semibold lg:text-[rgba(22,24,35,0.75)] text-white">
                {likesCount}
              </strong>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center cursor-pointer mb-1 lg:mb-0">
              <span className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full lg:bg-[rgba(22,24,35,0.06)]">
                <CommentIcon className="text-white lg:text-black lg:h-6 lg:w-6 h-8 w-8" />
              </span>

              <strong className="mt-1 text-[12px] font-semibold lg:text-[rgba(22,24,35,0.75)] text-white">
                {data.commentsCount}
              </strong>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center cursor-pointer mb-1 lg:mb-0">
              <span className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full lg:bg-[rgba(22,24,35,0.06)]">
                <ShareSolidIcon className="text-white lg:text-black lg:h-6 lg:w-6 h-8 w-8" />
              </span>

              <strong className="mt-1 text-[12px] font-semibold lg:text-[rgba(22,24,35,0.75)] text-white">
                {data.shareCount}
              </strong>
            </button>
          </div>
        </div>
      </div>
    );
  },
);

VideoCard.displayName = "VideoCard";

export default VideoCard;
