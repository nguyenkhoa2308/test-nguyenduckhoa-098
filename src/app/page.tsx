"use client";

import { useEffect, useRef, useState } from "react";
import VideoCard from "~/features/video-feed/components/VideoCard";
import type { Video } from "~/features/video-feed/types/video.type";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isMuted, setIsMuted] = useState(true);

  const vidRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Video[] = [
          {
            id: "1",
            authorName: "Nguyễn Khoa",
            authorAvatarUrl:
              "https://res.cloudinary.com/dezywk7nm/image/upload/v1732089659/pdbrffjlqjgln94dknoj.jpg",
            videoUrl:
              "https://videos.pexels.com/video-files/32330745/13791049_1440_2560_30fps.mp4",
            description: "Yo, I'm Khoa",
            likesCount: 0,
            shareCount: 0,
            commentsCount: 0,
          },
          {
            id: "2",
            authorName: "Nguyễn Khoa",
            authorAvatarUrl:
              "https://res.cloudinary.com/dezywk7nm/image/upload/v1732089659/pdbrffjlqjgln94dknoj.jpg",
            videoUrl:
              "https://videos.pexels.com/video-files/32332929/13792523_1440_2560_30fps.mp4",
            description: "Yo, I'm Khoa",
            likesCount: 0,
            shareCount: 0,
            commentsCount: 0,
          },
          {
            id: "3",
            authorName: "Nguyễn Khoa",
            authorAvatarUrl:
              "https://res.cloudinary.com/dezywk7nm/image/upload/v1732089659/pdbrffjlqjgln94dknoj.jpg",
            videoUrl:
              "https://videos.pexels.com/video-files/34339103/14547652_1080_1920_30fps.mp4",
            description: "Yo, I'm Khoa",
            likesCount: 0,
            shareCount: 0,
            commentsCount: 0,
          },
        ];

        const shuffled = [...data];

        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);

          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setVideos(shuffled);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("isMuted", JSON.stringify(isMuted));

    vidRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.currentTime = 0;

            setTimeout(() => {
              video.play();
            }, 100);
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.8,
      },
    );

    vidRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      vidRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]);

  useEffect(() => {
    localStorage.setItem("isMuted", JSON.stringify(isMuted));

    vidRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.currentTime = 0;

            setTimeout(() => {
              video.play();
            }, 100);
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.8,
      },
    );

    vidRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      vidRefs.current.forEach((video) => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]);

  return (
    <div className="flex w-full overflow-x-hidden transition-all duration-300 linear scroll-smooth h-screen items-center justify-center">
      <div className="w-full bg-white h-screen lg:max-h-[calc(100vh-60px)] overflow-y-scroll [scrollbar-width:none] snap-y snap-mandatory pb-[70px] lg:mb-0">
        {videos.map((item, index) => (
          <VideoCard
            key={item.id}
            data={item}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            ref={(el) => {
              vidRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
