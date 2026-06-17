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
- Kies de beste kaas op basis van smaakcombinatie.
- Analyseer eerst de stijl van de drank: zuur, zoet, droog, body, aroma's en intensiteit.
- Gebruik locatie als voorkeur, niet als beperking.
- Lokale keuze = waar gebruiker NU is.
- Geef minimaal 3 kazen.

Belangrijk bij de keuzes:
- De 3 kazen moeten verschillende stijlen hebben.
- Gebruik geen vaste standaard alternatieven.
- Adviseer Manchego alleen wanneer deze echt beter past dan andere kazen.
- Varieer tussen:
  zachte kazen,
  harde gerijpte kazen,
  blauwaderkazen,
  geitenkazen,
  gewassen korstkazen,
  lokale specialiteiten.
- Kijk naar vet, zout, zuur, romigheid en structuur van de kaas.
- Leg per kaas uit waarom deze specifiek bij deze drank past.
- Geef ook een kort verhaal over de drank alsof een sommelier dit tijdens een proeverij vertelt.

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
