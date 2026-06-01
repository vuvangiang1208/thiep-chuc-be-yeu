import React from "react";
import { Heart, Sparkles, Edit2 } from "lucide-react";

interface RomanticLetterProps {
  title: string;
  bodyText: string;
  sender: string;
  date: string;
  onTitleChange: (val: string) => void;
  onBodyChange: (val: string) => void;
  onSenderChange: (val: string) => void;
  onDateChange: (val: string) => void;
}

export default function RomanticLetter({
  title,
  bodyText,
  sender,
  date,
  onTitleChange,
  onBodyChange,
  onSenderChange,
  onDateChange,
}: RomanticLetterProps) {

  return (
    <div className="w-full flex flex-col gap-4">
      <section 
        id="romantic-letter-container" 
        className="relative w-full max-w-lg mx-auto bg-rose-950/45 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl animate-float transition-all duration-350 overflow-hidden"
      >
        {/* Subtle decorative handwriting lines/grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

        {/* Vintage delicate borders */}
        <div className="absolute inset-3.5 border border-dashed border-white/10 rounded-2xl pointer-events-none"></div>
        <div className="absolute inset-[18px] border border-white/5 rounded-2xl pointer-events-none"></div>

        {/* Glowing Orbs Inside Card */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rose-500/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Interactive editing hint for top-right */}
        <div className="absolute top-4 right-4 text-[10px] text-pink-300/60 font-semibold tracking-wider flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <Edit2 className="h-2.5 w-2.5" />
          <span>Click chữ để sửa trực tiếp</span>
        </div>

        {/* Sealed stamp logo */}
        <div className="relative z-10 flex flex-col items-center mb-5 sm:mb-6">
          <div className="relative mb-2">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-pink-400 to-rose-400 opacity-60 blur-xs animate-pulse"></div>
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg border border-white/20 transition-transform duration-500 hover:scale-110">
              <Heart className="h-5 w-5 fill-white text-white drop-shadow-sm" />
            </div>
          </div>

          {/* Letter Title (ContentEditable!) */}
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTitleChange(e.currentTarget.innerText || "")}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-lg sm:text-2xl text-white tracking-wide font-extrabold text-center mt-2 px-3 focus:outline-none focus:bg-white/10 rounded-lg transition-all drop-shadow-md cursor-text selection:bg-pink-500"
            title="Nhấp vào để sửa tiêu đề thư"
          >
            {title}
          </h2>

          {/* Golden-pink delicate separation ornament */}
          <div className="flex items-center gap-2 mt-3 w-full justify-center opacity-90">
            <div className="h-[1px] w-12 bg-linear-to-r from-transparent to-pink-300/40"></div>
            <span className="text-[10px] text-pink-300 font-extrabold tracking-widest uppercase font-serif">
              ✿ Gói trọn thương yêu ✿
            </span>
            <div className="h-[1px] w-12 bg-linear-to-l from-transparent to-pink-300/40"></div>
          </div>
        </div>

        {/* Letter Body Content (ContentEditable with full paragraph support!) */}
        <div 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onBodyChange(e.currentTarget.innerText || "")}
          style={{ fontFamily: "var(--font-serif)", fontSize: "16px", lineHeight: "1.7" }}
          className="relative z-10 text-pink-50 focus:text-white leading-relaxed font-medium px-1 sm:px-4 text-justify focus:outline-none focus:bg-white/10 rounded-xl py-2 min-h-[160px] cursor-text transition-all break-words selection:bg-pink-500 whitespace-pre-wrap"
          title="Nhấp vào để sửa đoạn văn của lá thư"
        >
          {bodyText}
        </div>

        {/* Signature & Date Bottom Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center px-1 sm:px-4">
          {/* Anniversary Date Field (ContentEditable) */}
          <span 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onDateChange(e.currentTarget.innerText || "")}
            className="text-[10px] text-pink-300 font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 px-1.5 py-0.5 rounded-sm cursor-text"
            title="Chỉnh sửa ngày"
          >
            {date}
          </span>

          {/* Sender Sign-off Field (ContentEditable) */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-pink-200 italic font-bold font-serif hover:scale-103 transition-transform duration-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse flex-shrink-0" />
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onSenderChange(e.currentTarget.innerText || "")}
              className="focus:outline-none focus:bg-white/10 px-1.5 py-0.5 rounded-sm cursor-text focus:not-italic"
              title="Chỉnh sửa chữ ký người gửi"
            >
              {sender}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
