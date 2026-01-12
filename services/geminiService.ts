import { GoogleGenAI, Type } from "@google/genai";
import { SAMPLE_PLANS } from "../constants";
import { Plan } from "../types";

// Note: In a real app, do not hardcode plans in the prompt if the list is huge.
// Use RAG or simpler filtering. For this demo, we inject the small list.
const SYSTEM_INSTRUCTION = `
당신은 '알뜰모바일'의 친절하고 유능한 요금제 상담사입니다.
사용자의 사용 패턴(데이터 사용량, 통화량, 선호 통신망, 예산 등)을 듣고 가장 적합한 요금제를 추천해주세요.
보유하고 있는 요금제 리스트 내에서만 추천해야 합니다.
답변은 한국어로 정중하게 해주세요.
`;

const PLANS_CONTEXT = JSON.stringify(SAMPLE_PLANS);

export const getPlanRecommendation = async (userQuery: string): Promise<{ text: string; recommendedIds: string[] }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We want structured output to highlight specific plans in the UI, plus a text explanation.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        보유 요금제 리스트: ${PLANS_CONTEXT}
        
        사용자 질문: ${userQuery}
        
        위 요금제 리스트 중에서 사용자의 질문에 가장 적합한 요금제를 1~3개 선정하여 추천해주세요.
        추천할 요금제가 없다면 빈 배열을 반환하고 이유를 설명해주세요.
      `,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: "사용자에게 추천 이유를 설명하는 친절한 답변 텍스트",
            },
            recommendedPlanIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "추천하는 요금제의 ID 목록 (p1, p2 등)",
            },
          },
          required: ["explanation", "recommendedPlanIds"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      text: result.explanation || "죄송합니다. 적절한 추천을 찾지 못했습니다.",
      recommendedIds: result.recommendedPlanIds || [],
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "죄송합니다. 일시적인 오류로 AI 상담을 진행할 수 없습니다. 잠시 후 다시 시도해주세요.",
      recommendedIds: [],
    };
  }
};