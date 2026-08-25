import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  initialMessage?: string;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  initialMessage = "Hi Webcloud! I'm interested in building a high-converting website for my clinic/business.",
  onClose,
}) => {
  const [customMessage, setCustomMessage] = useState(initialMessage);

  if (!isOpen) return null;

  const handleSend = () => {
    const encoded = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const quickPrompts = [
    "Hi Webcloud! I'm interested in the Basic Plan (₹4,499) for my website.",
    "Hi Webcloud! I want to get the Advanced Plan (₹7,999) for my clinic.",
    "Hi Webcloud! I want to get the Final Plan (₹9,999) for my practice.",
    "Hi Webcloud! I want a custom high-end 3D website consultation.",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
                <MessageCircle className="w-5 h-5 fill-slate-950/20" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Webcloud Studio</h3>
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Instant Clinical Response
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="mb-6 space-y-2">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Choose Quick Inquiry Prompt:
            </p>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomMessage(prompt)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-sans transition-all border cursor-pointer ${
                    customMessage === prompt
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-medium shadow-sm'
                      : 'bg-black/40 border-white/10 text-white/90 hover:bg-white/5'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Box */}
          <div className="mb-6 space-y-2">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Or Customize Message:
            </p>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-emerald-400 resize-none font-sans"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="w-1/3 py-3.5 rounded-full border border-white/15 text-xs font-semibold text-slate-400 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="w-2/3 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4 fill-slate-950/20" />
              <span>Send on WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
