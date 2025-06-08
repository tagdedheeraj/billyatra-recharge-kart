import React, { useState, useRef, useEffect } from 'react';
import { Gift, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface ScratchCardProps {
  onComplete: () => void;
  amount?: number;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ onComplete, amount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prize, setPrize] = useState({ amount: 0, type: '' });

  useEffect(() => {
    // Use provided amount or generate random prize
    if (amount) {
      setPrize({ amount, type: 'Cashback' });
    } else {
      const prizes = [
        { amount: 10, type: 'Cashback' },
        { amount: 25, type: 'Cashback' },
        { amount: 50, type: 'Cashback' },
        { amount: 100, type: 'Bonus' },
        { amount: 5, type: 'Cashback' },
        { amount: 20, type: 'Discount' }
      ];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
    }

    // Initialize canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Create scratch surface
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch pattern
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText('TO REVEAL PRIZE', canvas.width / 2, canvas.height / 2 + 15);

    // Set composite operation for scratching
    ctx.globalCompositeOperation = 'destination-out';
  }, [amount]);

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    scratch(e);
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale coordinates
    x = (x / rect.width) * canvas.width;
    y = (y / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 30 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const stopScratch = () => {
    setIsScratching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl border-0 bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Congratulations! 🎉</h2>
          <p className="text-orange-100">You've won a scratch card!</p>
        </div>

        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scratch to reveal your prize</h3>
            <p className="text-gray-600 text-sm">Use your finger or mouse to scratch the card</p>
          </div>

          <div className="relative mb-6">
            {/* Prize underneath */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <Star className="h-12 w-12 mx-auto mb-2" />
                <div className="text-3xl font-bold">₹{prize.amount}</div>
                <div className="text-lg">{prize.type}</div>
              </div>
            </div>

            {/* Scratch canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-48 rounded-xl cursor-pointer touch-none"
              onMouseDown={startScratch}
              onMouseMove={scratch}
              onMouseUp={stopScratch}
              onMouseLeave={stopScratch}
              onTouchStart={startScratch}
              onTouchMove={scratch}
              onTouchEnd={stopScratch}
              style={{ opacity: isRevealed ? 0.3 : 1, transition: 'opacity 1s ease-in-out' }}
            />
          </div>

          {isRevealed && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-green-800">
                  <Star className="h-5 w-5" />
                  <span className="font-semibold">You won ₹{prize.amount} {prize.type}!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Your reward has been added to your account
                </p>
              </div>

              <Button 
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Continue to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {!isRevealed && scratchPercentage > 10 && (
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-700 text-sm">
                  Keep scratching! ({Math.round(scratchPercentage)}% revealed)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScratchCard;
