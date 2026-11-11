# jgb-Boku

This lobby sends players to the DragonBallz SMP Minecraft server.

## Set It Up on Render

You will need a Render account and a Playit account. Render runs the lobby. Playit gives players an address they can use to reach it. The Render worker may cost money.

1. Make an account at Playit.gg.
2. In Playit, create an agent secret. It is a private key that connects this project to your Playit account. Keep it secret. You do not need to give anyone your Minecraft password.
3. In Render, choose **New** and then **Background Worker**. Connect the GitHub repository that contains this project.
4. Choose **Docker** as the runtime. Set the Dockerfile path to `./Dockerfile` and the Docker build context to `.`. Choose an available worker plan, then create the worker.
5. Open the worker's **Environment** settings and add these variables:
	- `PLAYIT_SECRET`: paste your Playit agent secret as the value.
	- `LISTEN_HOST`: `0.0.0.0`
	- `LISTEN_PORT`: `19132`
	- `TARGET_HOST`: `DragonBallzSMP.aternos.me`
	- `TARGET_PORT`: `19132`, or the current port shown by Aternos.
6. Save the settings and deploy the worker. Do not put your Playit secret in this README or share it in chat.
7. In Playit, create a **Minecraft Bedrock** tunnel. Choose **UDP** and set the local address to `127.0.0.1` and the local port to `19132`.
8. Wait for the lobby and Playit agent to show as running. Copy the public address and port Playit gives you. In Minecraft, add a server using that address. This is the address players use to join the lobby.

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
