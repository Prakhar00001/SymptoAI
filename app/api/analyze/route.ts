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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Groq API Key is not configured on the server.' },
        { status: 500 }
      );
    }

    const payload = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: MEDICAL_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Patient Demographics/Context: ${JSON.stringify(userContext || {})}\n\nReported Symptoms & Notes: ${symptoms}`,
        },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API Call Failed:', errText);
      return NextResponse.json({ error: 'AI processing service error.' }, { status: 502 });
    }

    const data = await response.json();
    const resultJson = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(resultJson);
  } catch (error) {
    console.error('Analysis API Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error while analyzing symptoms.' },
      { status: 500 }
    );
  }
}