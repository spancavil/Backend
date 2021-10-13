// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors:Array<string> = []

app.post('/', async (req:any) => {
    const {color} = await req.body();
    colors.push(color)
})

app.handle("/", async (req: any) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <title>servest</title>
        </head>
        <body style = {{backgroundColor: 'black'}}>
            <form action="" method="post" onSubmit = {handleSubmit}>
                <label htmlFor="POST-color">Color:</label>
                <input id="POST-name" type="text" name="color"/>
                <input type="submit" value="Save"/>
            </form>
            <ul>
            {colors.map(color => return <li style = {{color: {color}}}>{color}</li>)}
            </ul>
        </body>
      </html>
    ),
  });
});

app.listen({ port: 3000 });