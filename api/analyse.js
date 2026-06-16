export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Alleen POST toegestaan"
    });
  }

  try {

    const { image } = req.body;

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
                `Analyseer dit dranketiket als professionele sommelier en kaasexpert.

Bepaal:
- soort drank
- kleur/type
- naam drank
- druif of stijl
- land van herkomst
- regio van herkomst
- smaakprofiel van de drank

Geef daarna kaasadvies.

Regels voor kaasadvies:
- Kies kaas op basis van de beste smaakcombinatie met de drank.
- Gebruik de huidige locatie van de gebruiker alleen als voorkeur, niet als beperking.
- Zoek eerst passende kazen uit de regio of het land waar de gebruiker is.
- Als daar geen ideale combinatie is, kies betere kazen uit andere landen.
- Kies nooit alleen op plaatsnaam.
- Geef minimaal 3 verschillende kazen.

Geef per kaas:
- naam kaas
- land/regio
- waarom deze kaas goed past bij deze drank

Gebruik deze indeling:

🍷 Drankanalyse

🧀 Beste combinatie

📍 Lokale of regionale keuze

🌍 Extra alternatief

Antwoord duidelijk in het Nederlands.`


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
data.output?.[0]?.content?.[0]?.value ||
data.output?.[1]?.content?.[0]?.text ||
JSON.stringify(data);
res.status(200).json({
  resultaat: tekst
});

  } catch (error) {

    res.status(500).json({
      error: "Analyse mislukt"
    });

  }
}
