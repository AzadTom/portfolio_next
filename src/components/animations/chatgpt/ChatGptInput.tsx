'use client';
import { Mic, Plus, Send } from 'lucide-react';
import { useChatGpt } from './hooks/useChatgpt';
interface ChatInputProps {
  onSend?: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend = () => { } }) => {


  const { handleSubmit, handleOnChange, handleTextAreaChange, isExpanded, inputRef, editableRef, message, measureRef } = useChatGpt(onSend);


  return (
    <div className="w-full flex justify-center px-4 py-3 bg-transparent fixed bottom-0 left-0 right-0 z-50">
      <form
        onSubmit={handleSubmit}
        className={`flex items-end gap-2 bg-[#303030] rounded-4xl shadow-md px-3 py-2 w-full max-w-2xl  transition-all duration-300`}
      >
        <div className="w-full">
          {isExpanded && (
            <textarea
              ref={editableRef}
              value={message}
              rows={1}
              onChange={handleTextAreaChange}
              placeholder="Ask anything..."
              className="w-full bg-transparent outline-none text-white text-base resize-none border-none"
            />
          )}

          <div className="flex items-center w-full gap-2">
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-700 transition"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>

            {!isExpanded ? (
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={handleOnChange}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none outline-none text-white text-base"
              />
            ) : (
              <p className="flex-1" />
            )}

            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-700 transition"
            >
              <Mic className="w-5 h-5 text-white" />
            </button>

            <button
              type="submit"
              disabled={!message.trim()}
              className={`flex items-center justify-center h-10 w-10 rounded-full transition text-white ${message.trim()
                ? 'bg-black hover:bg-black'
                : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <span
          ref={measureRef}
          className="absolute invisible whitespace-pre font-sans text-base"
        />
      </form>
    </div>
  );
};

export default ChatInput;
