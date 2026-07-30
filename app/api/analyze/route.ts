import { NextResponse } from 'next/server';
import { MEDICAL_SYSTEM_PROMPT } from '@/lib/prompts';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { symptoms, userContext } = await req.json();

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe your symptoms to perform an analysis.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API Key is not configured on the server. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    const userPrompt = `Patient Demographics/Context: ${JSON.stringify(
      userContext || {}
    )}\n\nReported Symptoms & Notes: ${symptoms}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${MEDICAL_SYSTEM_PROMPT}\n\n${userPrompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Call Failed:', errText);
      return NextResponse.json(
        { error: 'Gemini AI processing service error. Please check your API key.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini API.');
    }

    const resultJson = JSON.parse(rawText);

    return NextResponse.json(resultJson);
  } catch (error) {
    console.error('Analysis API Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error while analyzing symptoms.' },
      { status: 500 }
    );
  }
}