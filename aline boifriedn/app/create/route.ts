export async function POST(request: Request) {
  const requestHeaders: HeadersInit = new Headers();
  if (process.env.AGEMO_API_KEY) {
    requestHeaders.set("x-api-key", process.env.AGEMO_API_KEY);
    requestHeaders.set("Content-Type", "application/json");
  }

  console.log(process.env.AGEMO_API_KEY);
  const req = await request.json();
  console.log(req.inputs.animal_image);
  console.log(req.inputs);


  const animal_image = req.inputs.animal_image;
  module.exports.MY_CONSTANT = animal_image;
  const description = req.inputs.title;
  console.log(description)

  const res = await fetch("https://api.agemo.ai/execute", {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      app_id: "clp45g8wb000nl108r4itrnap",
      inputs: {
        "character_portrait": "file://portrait.png;base64,"+animal_image,
        "character_description": description
      },
    }),
  });

  const data = await res.json();

  console.log(data);

  return Response.json({ data });
}
