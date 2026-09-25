'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  PhoneCall, 
  Video, 
  CheckCheck, 
  AlertTriangle, 
  Calendar, 
  IndianRupee, 
  Bot,
  Lock
} from 'lucide-react';

export const WhatsAppSimulatorDrawer: React.FC = () => {
  const { 
    whatsappDrawerOpen, 
    setWhatsappDrawerOpen, 
    language,
    activeWhatsappScenario,
    setActiveWhatsappScenario,
    whatsappChatHistory,
    sendWhatsappReply
  } = useApp();

  if (!whatsappDrawerOpen) return null;

  const currentScenarioData = whatsappChatHistory.find(sc => sc.id === activeWhatsappScenario) || whatsappChatHistory[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
        
        {/* Backdrop click to close */}
        <div 
          className="absolute inset-0"
          onClick={() => setWhatsappDrawerOpen(false)}
        />

        {/* Drawer Container with exact Motion specs from prompt */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
          className="relative w-full max-w-md bg-stone-100 h-full shadow-2xl flex flex-col z-10 border-l border-stone-300 overflow-hidden"
        >
          
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-bold text-[#075E54]">
                <Bot className="w-6 h-6 text-[#075E54]" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>

              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  MatriSetu Health Bot
                  <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase">
                    Verified
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  {language === 'en' ? 'Online • 24x7 Triage Assist' : 'ऑनलाइन • 24x7 स्वास्थ्य सहायक'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-100 transition">
                <PhoneCall className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-100 transition">
                <Video className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setWhatsappDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="bg-[#128C7E] px-2 py-2 flex items-center gap-1 border-t border-emerald-700">
            <button
              onClick={() => setActiveWhatsappScenario('reminder')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                activeWhatsappScenario === 'reminder' ? 'bg-white text-[#075E54] shadow-xs' : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'ANC Reminder' : 'अनुस्मारक'}</span>
            </button>

            <button
              onClick={() => setActiveWhatsappScenario('emergency')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                activeWhatsappScenario === 'emergency' ? 'bg-rose-600 text-white shadow-xs' : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span>{language === 'en' ? 'Emergency' : 'एसओएस'}</span>
            </button>

            <button
              onClick={() => setActiveWhatsappScenario('scheme')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                activeWhatsappScenario === 'scheme' ? 'bg-white text-[#075E54] shadow-xs' : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Payout Alert' : 'भुगतान'}</span>
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]">
            
            {/* System Encryption Notice */}
            <div className="flex justify-center">
              <span className="bg-amber-100/90 text-amber-900 text-[10px] font-semibold px-3 py-1 rounded-lg text-center max-w-xs border border-amber-200 shadow-2xs flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-700" />
                Messages are end-to-end encrypted with MatriSetu Health Cloud.
              </span>
            </div>

            {/* Render Scenario Messages */}
            {currentScenarioData.messages.map((msg) => {
              const isUser = msg.sender === 'patient';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-300">
                      {language === 'en' ? msg.textEn : msg.textHi}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs text-xs font-medium leading-relaxed ${
                      isUser
                        ? 'bg-[#d9fdd3] text-stone-900 rounded-tr-none border border-emerald-200'
                        : 'bg-white text-stone-900 rounded-tl-none border border-stone-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">
                      {language === 'en' ? msg.textEn : msg.textHi}
                    </p>

                    <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 mt-1">
                      <span>{msg.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </div>
                  </div>

                  {/* Interactive Quick Reply Buttons */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-col gap-1.5 w-[85%]">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendWhatsappReply(
                            currentScenarioData.id, 
                            `Selected: ${reply.labelEn}`, 
                            `चयनित: ${reply.labelHi}`
                          )}
                          className="bg-white hover:bg-emerald-50 text-[#075E54] border border-emerald-200 font-bold py-2 px-3 rounded-xl text-xs text-center transition shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <span>{language === 'en' ? reply.labelEn : reply.labelHi}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Chat Footer Input Simulation */}
          <div className="p-3 bg-stone-200 flex items-center gap-2 border-t border-stone-300">
            <input
              type="text"
              placeholder={language === 'en' ? 'Type message...' : 'मैसेज लिखें...'}
              className="flex-1 bg-white px-4 py-2.5 rounded-full text-xs text-stone-800 placeholder-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#075E54]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  sendWhatsappReply(
                    currentScenarioData.id, 
                    e.currentTarget.value, 
                    e.currentTarget.value
                  );
                  e.currentTarget.value = '';
                }
              }}
            />
            <button className="p-2.5 rounded-full bg-[#075E54] text-white hover:bg-emerald-800 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
