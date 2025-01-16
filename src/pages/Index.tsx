import React, { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProposalButton from "@/components/ProposalButton";
import CelebrationAnimation from "@/components/CelebrationAnimation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const typingAnimation = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { type: "tween", duration: 3 },
  },
};

const waveAnimation = {
  hidden: { y: 0 },
  visible: {
    y: [0, -5, 5, -5, 0],
    transition: { duration: 2, repeat: Infinity },
  },
};

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [proposalType, setProposalType] = useState("casar");
  const [customMessage, setCustomMessage] = useState("");
  const [isHeartClickable, setIsHeartClickable] = useState(false);

  const getProposalMessage = () => {
    if (proposalType === "custom") {
      return customMessage || "Digite sua mensagem personalizada";
    }
    return `Você quer ${proposalType} comigo?`;
  };

  const handleYesClick = () => {
    setAccepted(true);
    setShowCelebration(true);
    setIsHeartClickable(false);

    toast({
      title: "Eu te amo muito!!!",
      description:
        "Eu sem querer me apaixonei, não lutei, não evitei. Esse amor natural nasceu em mim, quero você do jeitinho que você é ❤️",
      duration: 5000,
    });

    setTimeout(() => {
      setIsHeartClickable(true);
    }, 10000);
  };

  const handleReset = () => {
    if (!isHeartClickable) return;
    setShowCelebration(false);
    setAccepted(false);
    setNoButtonPosition({ top: 0, left: 0 });
  };

  const moveNoButton = useCallback(() => {
    const container = document.getElementById("proposal-container");
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
        {/* Opções de proposta */}
        {!accepted && (
          <div className="mb-8">
            <RadioGroup
              value={proposalType}
              onValueChange={(value) => setProposalType(value)}
              className="flex flex-col items-start gap-4 mb-8"
            >
              <Label htmlFor="casar" className="flex items-center space-x-2">
                <RadioGroupItem value="casar" id="casar" />
                <span>Casar</span>
              </Label>
              <Label htmlFor="namorar" className="flex items-center space-x-2">
                <RadioGroupItem value="namorar" id="namorar" />
                <span>Namorar</span>
              </Label>
              <Label htmlFor="custom" className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <span>Texto próprio</span>
              </Label>
              {proposalType === "custom" && (
                <Input
                  placeholder="Digite sua mensagem personalizada"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mt-2"
                />
              )}
            </RadioGroup>
          </div>
        )}

        {/* Mensagem animada */}
        <motion.h1
          className={`text-4xl md:text-5xl font-bold text-primary mb-12 text-center overflow-hidden whitespace-nowrap ${
            accepted ? "" : "mb-8"
          }`}
          key={accepted ? "finalMessage" : "proposalMessage"}
          initial="hidden"
          animate="visible"
          variants={accepted ? {} : typingAnimation}
        >
          {accepted ? (
            <motion.div
              variants={waveAnimation}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold text-red-500"
            >
              Que nosso amor seja eterno! ❤️
            </motion.div>
          ) : (
            getProposalMessage()
          )}
        </motion.h1>

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
                  position: noButtonPosition.top ? "absolute" : "relative",
                  top: `${noButtonPosition.top}px`,
                  left: `${noButtonPosition.left}px`,
                  transition: "all 0.3s ease-in-out",
                }}
                className="transition-all duration-300"
              />
            </>
          )}
        </div>

        {/* Animação de celebração */}
        {showCelebration && <CelebrationAnimation />}

        {accepted && isHeartClickable && (
          <div className="mt-8 space-y-4 text-center">
            <button
              onClick={handleReset}
              disabled={!isHeartClickable}
              className={`text-4xl transition-transform duration-300 cursor-pointer ${
                !isHeartClickable
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              }`}
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
