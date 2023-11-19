Backend:
We need two things:, 
    URL of the API endpoint ("https://api.agemo.ai/execute")
    API KEY (provided)
    Specifically for requests on Codewords, we need to indicate our app id.
Then what is left are:
    input
    output

Example Code in Python:
//need requests package
response = requests.post(
            "https://api.agemo.ai/execute",
            headers={
                "x-api-key": AGEMO_API_KEY,
            },
            json={
                "app_id": "clp39s2e40003kz088yizkihq",
                "inputs": prepare_blip_api_inputs(image)
            }
both input and output are in json forms.

Example Code in JavaScript:
const res = await fetch("https://api.agemo.ai/execute", {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      app_id: "clp45g8wb000nl108r4itrnap",
      inputs: {
        "character_portrait": "file://portrait.png;base64,"+animal_image, //The inputs need to be put as the exact form as required. Check API documentation.
        "character_description": description
      }
    })
})


Frontend: (NEXT.js)
1. Download next.js and npm
2. Function assets in \components
3. Elements on webpage in page.tsx
4. route.ts for communication with Backend
5. The redirected page is monster\[id], where its element in page.tsx
6. Before running, do 
        npm i
    to install all required libraries
7. Do 
        npm run dev
    to start a locally hosted page