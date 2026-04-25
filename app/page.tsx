import CommTimerPoster from "../components/CommTimerPoster";

export const dynamic = "force-dynamic";

const timerConfig = {
  // Saturday, April 25 2026 at 10:00 AM Algeria time (UTC+1).
  targetDateTime: "2026-04-25T11:00:00+01:00",
};

export default function Page() {
  const initialNowDateTime = new Date().toISOString();

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#f2f2f2]">
      <div className="h-full w-full">
        <CommTimerPoster
          initialNowDateTime={initialNowDateTime}
          targetDateTime={timerConfig.targetDateTime}
        />
      </div>
    </main>
  );
}
