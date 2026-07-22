import type { Config } from '@netlify/functions'
import OpenAI from 'openai'

const openai = new OpenAI()

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Alleen POST toegestaan' }, { status: 405 })
  }

  try {
    const { image } = await req.json()

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Analyseer dit dranketiket als professionele sommelier.

Bepaal:
- soort drank
- kleur/type
- naam drank
- druif of stijl
- land van herkomst
- regio van herkomst
- smaakprofiel van de drank

Antwoord duidelijk in het Nederlands.

Geef alleen de drankanalyse.
Geef nog geen kaasadvies.
Het kaasadvies wordt later gemaakt met de locatie van de gebruiker.`,
            },
            {
              type: 'input_image',
              image_url: image,
              detail: 'auto',
            },
          ],
        },
      ],
    })

    return Response.json({ resultaat: response.output_text })
  } catch (error) {
    return Response.json({ error: 'Analyse mislukt' }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/analyse',
}
