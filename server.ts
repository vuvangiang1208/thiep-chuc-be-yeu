import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe initialize GoogleGenAI using environment variable
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY environment variable is not set. Using beautiful local mock stories.");
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API Route for generating romantic letters & poetry
  app.post("/api/romantic-letter", async (req, res) => {
    try {
      const { vibe, messageType, characterDetail } = req.body;
      const client = getGeminiClient();

      if (!client) {
        // Fallback premium romantic letter if Gemini API key isn't provided/ready
        return res.json({
          title: "Gửi Khánh Chi - Bé Iu Tuổi 25 Của Anh 💖",
          letter: `Chào Trần Khánh Chi, cô gái bé bỏng và là bình yên duy nhất của anh!

Hôm nay là ngày 01/06/2026. Ai bảo tuổi 25 thì không được làm trẻ con, không được có quà và không được vòi vĩnh cơ chứ? Với anh, bất kể thời gian trôi qua thế nào, em vẫn mãi là "bé iu" lanh lợi, lém lỉnh và đáng yêu nhất mà anh muốn bảo bọc suốt cuộc đời này. 

Em ${characterDetail || "thích trà sữa ngọt ngào, hay cười tít mắt mỗi khi vui và có chút giận dỗi tinh nghịch rất thương"}. Mỗi khoảnh khắc ở bên em, ngắm nhìn nụ cười trong trẻo của em đều giúp cuộc sống bận rộn ngoài kia của anh hóa dịu dàng đến lạ. Cảm ơn em vì đã xuất hiện, mang lại những sắc màu ấm áp nhất cho thế giới của anh. 

Nhân ngày đặc biệt này, anh muốn hứa với em rằng: dẫu em ở độ tuổi nào, dù là cô gái 25 tuổi độc lập kiên cường ngoài xã hội, thì khi trở về bên anh, em vẫn luôn được quyền làm cô bé nhỏ, nhận sự chiều chuộng tuyệt đối và tình yêu thương vô bờ bến. Mong bé Chi của anh luôn giữ vững sự tự tin rạng ngời, học tập làm việc thật tốt, và luôn là bến bờ hạnh phúc nhất của anh nhé! Anh yêu em rất nhiều!`,
          poeticNote: `Nắng hồng nghiêng xuống môi cười,\nThế gian ồn ã, thương người bình yên.\nTuổi hai mươi lăm dịu hiền,\nBên anh em mãi là miền trẻ thơ. ✨`
        });
      }

      const prompt = `Viết một bức thư tình hoặc thông điệp lãng mạn ngọt ngào mang chiều sâu và giàu cảm xúc dành tặng cho một cô gái tên là "Trần Khánh Chi" (năm nay 25 tuổi, biệt danh "bé iu" của người gửi) nhân ngày Quốc tế Thiếu nhi 01/06/2026 đầy lãng mạn.
Chi tiết yêu cầu:
- Tên nhân vật chính: Trần Khánh Chi (cô gái 25 tuổi, thông minh xinh đẹp, lanh lợi, nhưng thích được người yêu chiều chuộng ví như em bé duy nhất trong nhà).
- Phong cách viết: ${vibe || "Thơ mộng và dịu dàng"}.
- Loại thông điệp chính: ${messageType || "Lời hứa ngọt ngào và lãng mạn"}.
- Chi tiết đặc trưng về tính cách/sở thích của em: ${characterDetail || "thích uống trà sữa, hay cười tít mắt, thích mèo lông xù"}.
- Giọng văn: Rất tinh tế, ngọt ngào, trưởng thành nhưng đầy yêu chiều ấm áp, tuyệt đối KHÔNG viết kiểu dành cho trẻ con mầm non. Hãy tôn vinh nét quyến rũ trưởng thành của tuổi 25 kèm theo lời chúc ngọt ngào nhất.
- Trả lời dưới định dạng JSON có cấu trúc đúng sau:
{
  "title": "Tiêu đề thông điệp hoặc lời chúc viết bằng tiếng Việt thật tinh tế và lãng mạn",
  "letter": "Nội dung bức thư tình sâu lắng, lưu loát thiết tha, chia sẻ những lời hứa ấm áp vững chãi gửi tới Khánh Chi. Trình bày thành các đoạn văn ngắn rõ ràng.",
  "poeticNote": "Một bài thơ lãng mạn ngắn gồm 4 câu (thể thơ 4 chữ, 5 chữ, 7 chữ hoặc lục bát) đúc kết trọn vẹn tình yêu dịu dàng thắm thiết."
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Bạn là một nhà văn lãng mạn, sâu lắng người Việt, có giọng văn hiện đại, tinh tế như tản văn tình yêu dành cho thanh xuân trẻ tuổi.",
        }
      });

      const resultText = response.text || "{}";
      res.json(JSON.parse(resultText));
    } catch (error: any) {
      console.error("Error generating romantic letter via Gemini:", error);
      res.status(500).json({ error: "Không thể dệt thư tình vào lúc này. Vui lòng kiểm tra lại cấu hình." });
    }
  });

  // Serve static assets and frontend in production, or hook Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
