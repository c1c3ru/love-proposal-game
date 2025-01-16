import React, { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProposalButton from '@/components/ProposalButton';
import CelebrationAnimation from '@/components/CelebrationAnimation';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleYesClick = () => {
    setShowCelebration(true);
    setAccepted(true);
    toast({
      title: "Que maravilha!",
      description: "Você fez a escolha certa! ❤️",
      duration: 5000,
    });
  };

  const moveNoButton = useCallback(() => {
    const container = document.getElementById('proposal-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonWidth = 120; // Largura aproximada do botão
    const buttonHeight = 40; // Altura aproximada do botão

    const maxLeft = containerRect.width - buttonWidth;
    const maxTop = containerRect.height - buttonHeight;

    const newLeft = Math.random() * maxLeft;
    const newTop = Math.random() * maxTop;

    setNoButtonPosition({ top: newTop, left: newLeft });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Navbar />
      
      <div 
        id="proposal-container"
        className="container relative mx-auto pt-24 px-4 flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center animate-float">
          Você quer casar comigo?
        </h1>

        <div className="flex gap-6 items-center justify-center flex-wrap">
          {!accepted && (
            <>
              <ProposalButton
                variant="yes"
                onClick={handleYesClick}
                className="z-10"
              />
              <ProposalButton
                variant="no"
                onClick={moveNoButton}
                style={{
                  position: 'absolute',
                  top: `${noButtonPosition.top}px`,
                  left: `${noButtonPosition.left}px`,
                  transform: noButtonPosition.top ? 'none' : 'none',
                }}
                className="transition-all duration-300"
              />
            </>
          )}
        </div>

        {showCelebration && <CelebrationAnimation />}
        
        {accepted && (
          <div className="mt-8 text-2xl text-primary animate-celebrate text-center">
            Que nosso amor seja eterno! ❤️
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;