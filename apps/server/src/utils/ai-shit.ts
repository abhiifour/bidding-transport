import { GoogleGenAI } from "@google/genai";

const api_key = process.env.GEMINI_API_KEY ?? ""
const ai = new GoogleGenAI({ apiKey: api_key});

export async function predictBidPrice(materialType: string, quantity: number, pickupLocation: string, deliveryLocation: string, deadline: Date, requirement: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`Predict the ideal transportation price for a logistics bid with the following details:

              Material Type: ${materialType}
              Quantity: ${quantity} tons

              Pickup Location: ${pickupLocation}

              Delivery Location: ${deliveryLocation}

              Deadline: consider it from today to ${deadline}

              other requirements : ${requirement}

              The price should reflect a fair market value that ensures profitability for both the bidder and the client. Return only a single numeric value in INR (no currency symbol, no text, no explanation, no range). The number should represent the base price estimate for the trip described above.`
  });
  return response.text;

  console.log(response.text);
}
