import {
  useEffect,
  useState,
  useRef,
  useCallback,
  FunctionComponent,
} from "react";
import useWinnerStore from "@/stores/storeWinner";
import useListLotery from "@/stores/storeListLottery";
import AlertWin from "@/components/AlertWin";

interface INameListProps {
  startShuffle: boolean;
  stopShuffle: () => void;
}

const NameList: FunctionComponent<INameListProps> = ({
  startShuffle,
  stopShuffle,
}) => {
  const { listLottery, removeListLottery } = useListLotery();
  const { winner, setWinner, setListWinner } = useWinnerStore();
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const listLotteryRef = useRef(listLottery);
  const animationRef = useRef<number>(0);
  const indexRef = useRef(0);
  const startTimeRef = useRef(0);

  // Function to get next name sequentially (like a slot machine)
  const getNextName = useCallback((array: string[]) => {
    if (array.length === 0) return "";
    const name = array[indexRef.current];
    indexRef.current = (indexRef.current + 1) % array.length;
    return name;
  }, []);

  // set initial display name
  useEffect(() => {
    listLotteryRef.current = listLottery;
  }, [listLottery]);

  // Smooth slot-machine animation with ease-out deceleration
  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const totalDuration = 4500; // total animation time (ms)

      // Calculate interval based on elapsed time (ease-out effect)
      // Start at ~30ms (fast), end at ~350ms (slow)
      const progress = Math.min(elapsed / totalDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      const minInterval = 30;
      const maxInterval = 350;
      const interval = minInterval + (maxInterval - minInterval) * eased;

      // Update display name based on calculated interval
      const lastUpdate = animationRef.current as unknown as number;
      if (!lastUpdate || timestamp - lastUpdate >= interval) {
        setDisplayName(getNextName(listLotteryRef.current));
        animationRef.current = timestamp as unknown as number;
      }

      if (elapsed < totalDuration) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - pick winner
        const winnerName = getNextName(listLotteryRef.current);
        if (winnerName) {
          setDisplayName(winnerName);
          // Brief pause before revealing winner
          setTimeout(() => {
            setWinner(winnerName);
            removeListLottery(winnerName);
            setListWinner(winnerName);
            setIsOpen(true);
            setIsAnimating(false);
            stopShuffle();
          }, 400);
        }
      }
    },
    [getNextName, setWinner, setListWinner, removeListLottery, stopShuffle],
  );

  // Start animation when startShuffle is true
  useEffect(() => {
    if (!startShuffle || listLotteryRef.current.length === 0) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    setIsOpen(false);
    setDisplayName("");
    indexRef.current = 0;
    startTimeRef.current = 0;
    animationRef.current = 0 as unknown as number;

    // Randomize starting index
    indexRef.current = Math.floor(
      Math.random() * listLotteryRef.current.length,
    );

    requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsAnimating(false);
    };
  }, [startShuffle, animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setWinner(null);
      setIsOpen(false);
    };
  }, [setWinner]);

  return (
    <div className={"w-full"}>
      <AlertWin openDialog={isOpen} onOpenChange={setIsOpen} />
      <div className={"flex items-center justify-center"}>
        {listLottery.length <= 1 ? (
          <div className="flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center text-center ">
            <div className="text-red-500 font-bold">
              Mohon isi data list lebih dari 1 untuk melakukan pengacakan
            </div>
          </div>
        ) : (
          <div
            className={`flex bg-white w-3/4 px-4 py-2 rounded-full justify-center items-center transition-all duration-300 ${
              isAnimating
                ? "shadow-lg shadow-primary/20 scale-105 ring-2 ring-primary/30"
                : ""
            }`}
          >
            <div
              className={`font-bold text-4xl transition-all duration-200 ${
                isAnimating ? "text-primary animate-pulse" : ""
              } ${winner && !isAnimating ? "text-green-600 scale-110" : ""}`}
            >
              {isAnimating ? displayName || "\u00A0" : winner || "Klik Mulai"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameList;
