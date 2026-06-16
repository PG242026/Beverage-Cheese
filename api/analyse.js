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
                  `Analyseer dit dranketiket.

Geef terug:
- soort drank
- kleur/type
- naam drank
- druif of stijl
- land
- regio

Antwoord kort en duidelijk in het Nederlands.`
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
  "Geen tekst gevonden in AI antwoord";

res.status(200).json({
  resultaat: tekst
});

  } catch (error) {

    res.status(500).json({
      error: "Analyse mislukt"
    });

  }
}
