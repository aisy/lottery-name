import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import useWinnerStore from "@/stores/storeWinner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";

interface IDialogWinnerProps {
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertWin: React.FunctionComponent<IDialogWinnerProps> = ({
  openDialog,
  onOpenChange,
}) => {
  const { winner } = useWinnerStore();
  const hasFiredRef = useRef(false);

  const fireConfetti = useCallback(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;

    const duration = 3000;
    const end = Date.now() + duration;

    // Firework burst from the center
    const centerFirework = () => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
        startVelocity: 30,
        gravity: 1,
        scalar: 1.2,
        drift: 0,
      });
    };

    // Side cannons
    const sideCannon = (originX: number, delay: number) => {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { x: originX, y: 0.7 },
          colors: ["#ffd700", "#ff6347", "#7b68ee", "#00ced1"],
          startVelocity: 45,
          gravity: 0.8,
          scalar: 0.9,
        });
      }, delay);
    };

    // Continuous burst effect
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      const particleCount = Math.floor(Math.random() * 30) + 10;
      const originX = Math.random() * 0.4 + 0.3;
      const originY = Math.random() * 0.4 + 0.2;

      confetti({
        particleCount,
        spread: Math.random() * 80 + 40,
        origin: { x: originX, y: originY },
        colors: [
          `hsl(${Math.random() * 360}, 100%, 50%)`,
          `hsl(${Math.random() * 360}, 80%, 60%)`,
          `hsl(${Math.random() * 360}, 90%, 40%)`,
        ],
        startVelocity: Math.random() * 30 + 20,
        gravity: 0.7 + Math.random() * 0.5,
        scalar: 0.8 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 0.5,
        ticks: 100 + Math.floor(Math.random() * 100),
      });
    }, 150);

    // Fire initial bursts
    centerFirework();
    sideCannon(0.2, 200);
    sideCannon(0.8, 400);

    // Cleanup interval
    setTimeout(() => clearInterval(interval), duration);
  }, []);

  // Reset ref and fire confetti when dialog opens
  useEffect(() => {
    if (openDialog) {
      hasFiredRef.current = false;
      // Small delay to let the dialog render first
      const timeout = setTimeout(() => fireConfetti(), 300);
      return () => clearTimeout(timeout);
    }
  }, [openDialog, fireConfetti]);

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="bg-linear-to-br from-yellow-50 via-white to-orange-50 border-2 border-yellow-400 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-red-500">
            🎉 Selamat! 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-yellow-300/40" />
            <Image
              alt="coin"
              width={160}
              height={160}
              src={"/win.svg"}
              className="relative animate-bounce"
            />
          </div>
          <div
            className={"text-3xl font-extrabold text-gray-800 text-center px-4"}
          >
            Selamat{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-red-500">
              {winner}
            </span>{" "}
            anda menang!
          </div>
          <div className={"text-lg font-semibold text-gray-500 animate-pulse"}>
            🎊 mendapatkan hadiah ??? 🎊
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertWin;
