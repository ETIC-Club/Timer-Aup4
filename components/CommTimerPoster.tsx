"use client";

import Image from "next/image";
import { Archivo_Black, Teko } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const counterFont = Teko({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const ribbonWords = Array.from({ length: 12 }, () => "AUP4");

const DEFAULT_TARGET_DATE_TIME = "2026-04-25T10:00:00+01:00";
const DEFAULT_INITIAL_NOW_DATE_TIME = "2026-04-22T12:42:00+02:00";

type CommTimerPosterProps = {
  initialNowDateTime?: string;
  targetDateTime?: string;
};

type CountdownParts = {
  hours: number;
  minutes: number;
  seconds: number;
  remainingMilliseconds: number;
};

type RibbonProps = {
  className: string;
  reverse?: boolean;
  paused?: boolean;
  tone: string;
};

function getCountdownParts(
  targetDateTime: string,
  nowDateTime: string | number,
): CountdownParts {
  const targetTime = new Date(targetDateTime).getTime();
  const currentTime =
    typeof nowDateTime === "number"
      ? nowDateTime
      : new Date(nowDateTime).getTime();
  const diff = Math.max(0, targetTime - currentTime);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    remainingMilliseconds: diff,
  };
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function Ribbon({
  className,
  reverse = false,
  paused = false,
  tone,
}: RibbonProps) {
  const animationClass = paused
    ? ""
    : reverse
      ? "animate-marquee-reverse"
      : "animate-marquee";
  const trackCopies = paused ? [0] : [0, 1];

  return (
    <div
      className={`absolute z-10 overflow-hidden shadow-[0_0.45vw_1vw_rgba(0,0,0,0.06)] ${className}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 ${tone}`} />
      <div className="relative flex h-full items-center overflow-hidden">
        <div
          className={`flex w-max shrink-0 ${animationClass} ${
            paused ? "translate-x-[-8%]" : ""
          }`}
        >
          {trackCopies.map((track) => (
            <div
              key={track}
              className={`flex shrink-0 items-center gap-[clamp(2.5rem,4vw,5.5rem)] px-[clamp(2rem,4vw,5rem)] ${displayFont.className}`}
            >
              {ribbonWords.map((word, index) => (
                <span
                  key={`${track}-${index}`}
                  className="whitespace-nowrap text-[clamp(1.7rem,4.2vw,5.7rem)] leading-none tracking-[-0.045em] text-[#f2f2f2]"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TimerLabel = "HOUR" | "MIN" | "SEC";

function CountdownFace({
  label,
  value,
}: {
  label: TimerLabel;
  value: string;
}) {
  const numberSizeClass =
    value.length > 2
      ? "text-[clamp(4.9rem,9vw,11.6rem)]"
      : "text-[clamp(5.9rem,11.4vw,14rem)]";

  return (
    <div className="relative flex h-full flex-col items-center justify-between overflow-hidden rounded-[clamp(1.35rem,2.45vw,3.6rem)] bg-[#272727] px-[5.5%] pb-[7.5%] pt-[5.2%] text-white shadow-[0_0.9vw_1.8vw_rgba(0,0,0,0.12)]">
      <div
        className="absolute inset-x-[10%] top-[3%] h-[20%] rounded-full bg-white/7 blur-[1.1vw]"
        aria-hidden="true"
      />
      <div className="relative flex min-h-0 flex-[1_1_auto] items-center justify-center pb-[2%]">
        <span
          className={`${counterFont.className} ${numberSizeClass} leading-[0.68] tracking-[0.045em]`}
        >
          {value}
        </span>
      </div>
      <span
        className={`${displayFont.className} relative text-[clamp(1rem,2.15vw,2.9rem)] leading-none tracking-[-0.055em]`}
      >
        {label}
      </span>
    </div>
  );
}

export default function CommTimerPoster({
  initialNowDateTime = DEFAULT_INITIAL_NOW_DATE_TIME,
  targetDateTime = DEFAULT_TARGET_DATE_TIME,
}: CommTimerPosterProps) {
  const stableInitialCountdown = useMemo(
    () => getCountdownParts(targetDateTime, initialNowDateTime),
    [initialNowDateTime, targetDateTime],
  );
  const [countdown, setCountdown] = useState(stableInitialCountdown);

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownParts(targetDateTime, Date.now()));
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDateTime]);

  const showAlmostOver =
    countdown.remainingMilliseconds > 0 &&
    countdown.remainingMilliseconds <= 12 * 60 * 60 * 1000;
  const isComplete = countdown.remainingMilliseconds <= 0;

  return (
    <section className="relative isolate h-full w-full overflow-hidden bg-[#f2f2f2]">
      <div className="absolute inset-0 bg-[#f2f2f2]" />

      <Image
        src="/comm-timer/paper-texture.png"
        alt=""
        fill
        priority
        className="pointer-events-none absolute scale-[1.22] object-cover opacity-35 mix-blend-multiply brightness-[2.3] contrast-[0.58] saturate-0"
      />

      <Ribbon
        className="left-[-7%] top-[4.4%] h-[12.7%] w-[122%] rotate-[20.8deg]"
        paused={isComplete}
        tone="bg-[#3e654f]"
      />
      <Ribbon
        className="left-[-16%] top-[44.9%] h-[12.7%] w-[126%] -rotate-[34.5deg]"
        paused={isComplete}
        reverse
        tone="bg-[#f4d316]"
      />

      {isComplete ? (
        <div className="absolute inset-[8%_6%_10%_6%] z-50 flex items-center justify-center text-center text-[#272727]">
          <div className={`${displayFont.className} max-w-[92%]`}>
            <p className="text-[clamp(3rem,7vw,8rem)] leading-[0.9] tracking-[-0.075em]">
              CONGRATULATION,
            </p>
            <p className="text-[clamp(2.85rem,6.4vw,7.3rem)] leading-[0.9] tracking-[-0.075em]">
              GOOD LUCK WITH
            </p>
            <p className="text-[clamp(2.85rem,6.4vw,7.3rem)] leading-[0.9] tracking-[-0.075em]">
              PRESENTATIONS !
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`absolute left-[4.1%] top-[5.2%] z-30 flex flex-col text-[#272727] ${displayFont.className}`}
          >
            {["TIC", "TAC", "TIC", "TAC"].map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="text-[clamp(3.2rem,8.5vw,10.6rem)] leading-[0.84] tracking-[-0.07em]"
              >
                {word}
              </span>
            ))}
          </div>

          <div
            className="absolute left-[20.1%] top-[14.2%] z-30 w-[11.2%]"
            aria-hidden="true"
          >
            <Image
              src="/comm-timer/arrows.png"
              alt=""
              width={290}
              height={217}
              className="h-auto w-full object-contain"
            />
          </div>
        </>
      )}

      <div
        className={`absolute left-[60.5%] z-20 w-[83%] -translate-x-1/2 ${
          isComplete
            ? "bottom-[-3.5%] opacity-55"
            : "bottom-[-1.5%] opacity-100"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/comm-timer/clocks.png"
          alt=""
          width={1998}
          height={732}
          className="h-auto w-full object-contain"
        />
      </div>

      {!isComplete ? (
        <div className="absolute left-[24.1%] top-[29.8%] z-40 h-[45.2%] w-[68.9%]">
          <div
            className="relative grid h-full grid-cols-3"
            style={{ gap: "3.2%" }}
          >
            <CountdownFace
              label="HOUR"
              value={formatCounter(countdown.hours)}
            />
            <CountdownFace
              label="MIN"
              value={formatCounter(countdown.minutes)}
            />
            <CountdownFace
              label="SEC"
              value={formatCounter(countdown.seconds)}
            />
          </div>

          {showAlmostOver ? (
            <div className="absolute right-[-1.6%] top-[-19%] z-50 w-[24%] rotate-[9deg]">
              <Image
                src="/comm-timer/almost-over.png"
                alt="Almost over"
                width={480}
                height={400}
                className="h-auto w-full object-contain drop-shadow-[0_0.85rem_1.35rem_rgba(0,0,0,0.22)]"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="absolute bottom-[10.25%] left-[3.1%] z-40 w-[18.4%] min-w-[6rem] max-w-[17rem]">
        <Image
          src="/comm-timer/logo.png"
          alt="Logos ETIC et Algiers'Up"
          width={340}
          height={113}
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}
