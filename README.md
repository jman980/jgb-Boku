# jgb-Boku

This lobby sends players to the DragonBallz SMP Minecraft server.

## Set It Up on Render

You will need a Render account and a Playit account. Render runs the lobby. Playit gives players an address they can use to reach it. The Render worker may cost money.

1. Make an account at Playit.gg.
2. In Playit, make an agent secret. It is a private key that connects this project to your Playit account. Keep it secret. You do not need to give anyone your Minecraft password.
3. Open this project in Render and choose **New Blueprint**. Connect the project repository and deploy it. Render will use the `render.yaml` file.
4. In Render, open the lobby service's **Environment** settings. Add a variable named `PLAYIT_SECRET`. Put your Playit agent secret in its value, then save.
5. In Playit, make a new **Minecraft Bedrock** tunnel. Choose **UDP** and set the local address to `127.0.0.1` and the local port to `19132`.
6. Wait for the lobby and Playit agent to show as running in their logs or dashboards.
7. Copy the public address and port Playit gives you. In Minecraft, add a server using that address. This is the address players use to join the lobby.

When someone joins the lobby, it sends them to `DragonBallzSMP.aternos.me` on port `19132`. The Aternos server must be online. If Aternos shows a different port, change `TARGET_PORT` in Render's **Environment** settings to that port.

The username `PLAYDragonBallJ` is not used by this lobby. No Minecraft account or Minecraft password is needed.

## Join Aternos Directly

To skip the lobby, add `DragonBallzSMP.aternos.me` in Minecraft and use the current port shown on the Aternos server page.

## Run on Your Computer

```sh
npm install
npm start
```

This starts the lobby on your computer. Other players can join it only if your network lets Minecraft Bedrock traffic through and they have your public address.
