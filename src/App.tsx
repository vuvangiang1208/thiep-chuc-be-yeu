import React, { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";
import RomanticLetter from "./components/RomanticLetter";
import RosePetalsAndFireworks from "./components/RosePetalsAndFireworks";

const DEFAULT_TITLE = "Thư Gửi Khánh Chi - Nàng Thơ Tuổi 25 🌸";
const DEFAULT_BODY = `Chào Khánh Chi, cô gái bé bỏng và là bình yên duy nhất của anh!

Hôm nay là mùng 1 tháng 6. Ở tuổi 25, em bận rộn với công việc của mình ngoài xã hội, nhưng khi trở về bên anh, em hãy cứ ôm lấy đặc quyền làm "bé con" được yêu chiều vô điều kiện nhé.

Anh thích ngắm nụ cười tít mắt của em, thích chiều theo sở thích của em, ngọt ngào và nâng niu từng nét tinh nghịch, nhõng nhẽo từ em. Cảm ơn em vì đã xuất hiện, mang theo sắc hồng dịu ngọt xua tan mọi mỏi mệt trong anh.

Dẫu mai này thế giới đổi thay, anh hứa luôn là điểm tựa vững chãi, lắng nghe và đồng hành cùng em trên mọi nẻo đường tương lai. Chúc bé Chi luôn luôn hạnh phúc, rạng rỡ và bình yên bước đi bên anh nhé. Anh yêu em rất nhiều! ❤️`;

export default function App() {
  const [bgImage] = useState(() => {
    return localStorage.getItem("romantic_bg_image") || "/src/assets/images/khanh-chi-tran.jpg";
  });

  const [letterTitle, setLetterTitle] = useState(() => {
    return localStorage.getItem("romantic_letter_title") || DEFAULT_TITLE;
  });

  const [letterBody, setLetterBody] = useState(() => {
    return localStorage.getItem("romantic_letter_body") || DEFAULT_BODY;
  });

  const [senderName, setSenderName] = useState(() => {
    return localStorage.getItem("romantic_sender_name") || "Yêu em nhất đời";
  });

  const [recipientName, setRecipientName] = useState(() => {
    return localStorage.getItem("romantic_recipient_name") || "Khánh Chi";
  });

  const [recipientAge, setRecipientAge] = useState(() => {
    return localStorage.getItem("romantic_recipient_age") || "25";
  });

  const [anniversaryDate, setAnniversaryDate] = useState(() => {
    return localStorage.getItem("romantic_anniversary_date") || "01/06/2026";
  });

  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync state values to local storage for automatic state persistence
  useEffect(() => {
    localStorage.setItem("romantic_letter_title", letterTitle);
    localStorage.setItem("romantic_letter_body", letterBody);
    localStorage.setItem("romantic_sender_name", senderName);
    localStorage.setItem("romantic_recipient_name", recipientName);
    localStorage.setItem("romantic_recipient_age", recipientAge);
    localStorage.setItem("romantic_anniversary_date", anniversaryDate);
  }, [
    letterTitle,
    letterBody,
    senderName,
    recipientName,
    recipientAge,
    anniversaryDate,
  ]);

  const triggerSavedToast = () => {
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 2000);
  };

  return (
    <div id="main-app-container" className="min-h-screen text-white flex flex-col justify-between animate-fade-in font-sans relative overflow-hidden bg-stone-950">
      
      {/* 1. Immersive Full-Screen Cinematic Portrait Background of choice */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1005 saturate-[0.95]"
        style={{ 
          backgroundImage: `url('${bgImage}')` 
        }} 
      />

      {/* 2. Soft, luxurious ambient vignette for flawless text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-stone-950/75 via-rose-950/45 to-stone-950/80" />

      {/* 3. Pure Magic Floating Ambient Rose Lights blur orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none z-[1] animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none z-[1] animate-float"></div>

      {/* 4. Beautiful Falling Rose Petals and Pink Fireworks Canvas Backdrop */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <RosePetalsAndFireworks />
      </div>

      {/* 5. Pure Elegant Header featuring inline-editable recipient metadata */}
      <header className="relative z-10 pt-10 pb-4 text-center max-w-4xl mx-auto px-4 w-full">
        {/* Dynamic Editorial style tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-rose-200 font-bold text-xs uppercase tracking-widest mb-3 border border-white/10 shadow-lg backdrop-blur-md animate-sway">
          <Heart className="h-3 w-3 fill-rose-300 text-rose-300 animate-pulse" />
          <span>Bé Iu Tuổi </span>
          <span 
            contentEditable 
            suppressContentEditableWarning
            onBlur={(e) => {
              setRecipientAge(e.currentTarget.innerText || "");
              triggerSavedToast();
            }}
            className="focus:outline-none focus:bg-white/10 px-1 rounded-xs inline-block underline decoration-rose-400 font-bold cursor-text text-white"
          >
            {recipientAge}
          </span>
          <span> Của Tôi • </span>
          <span 
            contentEditable 
            suppressContentEditableWarning
            onBlur={(e) => {
              setAnniversaryDate(e.currentTarget.innerText || "");
              triggerSavedToast();
            }}
            className="focus:outline-none focus:bg-white/10 px-1 rounded-xs inline-block underline decoration-rose-400 font-bold cursor-text text-white text-xs sm:text-xs"
          >
            {anniversaryDate}
          </span>
        </div>

        {/* Dynamic Display Heading with editable Recipient name */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white tracking-tight font-black leading-tight max-w-2xl mx-auto drop-shadow-md">
          Dành Cho{" "}
          <span 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              setRecipientName(e.currentTarget.innerText || "");
              triggerSavedToast();
            }}
            className="text-rose-300 font-serif italic relative inline-block cursor-text focus:outline-none focus:bg-white/10 px-2 rounded-lg transition-all"
            title="Nhấp trực tiếp để sửa tên người thương"
          >
            {recipientName}
            <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-pink-300 via-rose-400 to-rose-300 rounded-full shadow-inner"></span>
          </span>{" "}
          - Nàng Thơ Tuổi {recipientAge} 🌹
        </h1>
      </header>

      {/* 6. Centered Immersive Glassmorphism Writing Pad Letter (Directly Inline Editable) */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 w-full flex-grow flex items-center justify-center py-4">
        <div className="w-full transform transition-all duration-700">
          <RomanticLetter 
            title={letterTitle} 
            bodyText={letterBody} 
            sender={senderName} 
            date={anniversaryDate} 
            onTitleChange={(val) => {
              setLetterTitle(val);
              triggerSavedToast();
            }}
            onBodyChange={(val) => {
              setLetterBody(val);
              triggerSavedToast();
            }}
            onSenderChange={(val) => {
              setSenderName(val);
              triggerSavedToast();
            }}
            onDateChange={(val) => {
              setAnniversaryDate(val);
              triggerSavedToast();
            }}
          />
        </div>
      </main>

      {/* 7. Elegant Polaroid Vintage Signature Footer Envelope Seal */}
      <footer className="relative z-10 w-full flex justify-center pb-8 pt-4 px-4">
        <div className="bg-white/10 border border-white/10 p-3.5 rounded-2xl shadow-xl max-w-xs w-full text-center hover:scale-105 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
          {/* Internal glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 pointer-events-none"></div>
          
          <div className="mx-auto w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-md animate-pulse mb-1.5 border border-white/20">
            ❤️
          </div>
          <p className="text-pink-100 font-serif italic text-xs leading-normal font-bold">
            Gửi thương bé iu <span className="text-rose-300 font-extrabold">{recipientName}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
