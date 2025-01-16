import React, { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProposalButton from '@/components/ProposalButton';
import CelebrationAnimation from '@/components/CelebrationAnimation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [proposalType, setProposalType] = useState('casamento');
  const [customMessage, setCustomMessage] = useState('');

  const getProposalMessage = () => {
    if (proposalType === 'custom') {
      return customMessage || 'Digite sua mensagem personalizada';
    }
    return `Você quer ${proposalType} comigo?`;
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    setAccepted(true);
    toast({
      title: "Que maravilha!",
      description: "Você fez a escolha certa! ❤️",
      duration: 5000,
    });
  };

  const handleReset = () => {
    setShowCelebration(false);
    setAccepted(false);
    setNoButtonPosition({ top: 0, left: 0 });
  };

  const moveNoButton = useCallback(() => {
    const container = document.getElementById('proposal-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 40;

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
        {!accepted && (
          <div className="mb-8 space-y-6">
            <RadioGroup
              defaultValue="casamento"
              value={proposalType}
              onValueChange={setProposalType}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casamento" id="casamento" />
                <Label htmlFor="casamento">Casamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="namoro" id="namoro" />
                <Label htmlFor="namoro">Namoro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Mensagem Personalizada</Label>
              </div>
            </RadioGroup>

            {proposalType === 'custom' && (
              <Input
                type="text"
                placeholder="Digite sua mensagem personalizada"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="max-w-md"
              />
            )}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center animate-float">
          {getProposalMessage()}
        </h1>

        <div className="flex gap-6 items-center justify-center">
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
                onMouseEnter={moveNoButton}
                style={{
                  position: noButtonPosition.top ? 'absolute' : 'relative',
                  top: `${noButtonPosition.top}px`,
                  left: `${noButtonPosition.left}px`,
                  transition: 'all 0.3s ease-in-out',
                }}
                className="transition-all duration-300"
              />
            </>
          )}
        </div>

        {showCelebration && <CelebrationAnimation />}
        
        {accepted && (
          <div className="mt-8 space-y-4 text-center">
            <div className="text-2xl text-primary animate-celebrate">
              Que nosso amor seja eterno! ❤️
            </div>
            <button
              onClick={handleReset}
              className="text-4xl hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;