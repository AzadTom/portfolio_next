"use client";
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import React from 'react';

export default function SpeechDemoPage() {
  const { text, isListening, startListening, stopListening, clearText, hasSupport } = useSpeechRecognition();

  if (!hasSupport) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Supported</h2>
          <p className="text-gray-500">Your browser doesn't support the Web Speech API. Please try using Chrome, Edge, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 z-10 transition-all duration-300">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
             <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Speech to Text
          </h1>
          <p className="text-gray-500 font-medium">Tap the button and start speaking</p>
        </div>

        <div className="flex justify-center mb-8 h-20 items-center">
          {isListening ? (
             <div className="relative group">
               {/* Pulsing background effect */}
               <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30 group-hover:opacity-40 transition-opacity"></div>
               <button
                 onClick={stopListening}
                 className="relative bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3"
               >
                 <span className="w-3 h-3 bg-white rounded-sm shadow-sm"></span>
                 Stop Recording
               </button>
             </div>
          ) : (
            <button
              onClick={startListening}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 hover:-translate-y-1"
            >
              <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div> 
              Start Recording
            </button>
          )}
        </div>

        <div className="mt-8 p-5 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 min-h-[140px] shadow-inner transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
             <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Transcript</div>
          </div>
          
          <div className="relative">
            {isListening && !text && (
              <div className="text-gray-400 italic absolute inset-0 flex items-center">Listening for your voice...</div>
            )}
            <p className="text-gray-800 leading-relaxed font-medium text-lg">
              {text}
            </p>
            {!isListening && !text && (
               <div className="text-gray-300 italic">No speech detected yet.</div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}
