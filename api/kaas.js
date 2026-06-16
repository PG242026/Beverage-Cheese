export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Alleen POST toegestaan"
    });
  }

  try {

    const { image, land, provincie, plaats } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "gpt-4.1-mini",

          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text:
`Je bent een professionele sommelier en kaasexpert.

Geef kaasadvies voor deze drank.

Locatie gebruiker:
Land: ${land}
Provincie/regio: ${provincie}
Plaats: ${plaats}

Regels:
- Kies de beste kaas op smaakcombinatie.
- Gebruik locatie als voorkeur, niet als beperking.
- Lokale keuze = waar gebruiker NU is.
- Geef ook internationale alternatieven.
- Geef minimaal 3 kazen.
- Leg uit waarom de kaas past.

Gebruik:

🧀 Beste combinatie

📍 Lokale of regionale keuze

🌍 Extra alternatief

Antwoord in het Nederlands.`
                },
                {
                  type: "input_image",
                  image_url: image
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const tekst =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      JSON.stringify(data);

    res.status(200).json({
      resultaat: tekst
    });

  } catch (error) {

    res.status(500).json({
      error: "Kaasadvies mislukt"
    });

  }
}
