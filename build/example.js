const { config } = require("dotenv");
config();

const {
    Container, Section,
    TextDisplay, MediaGallery, MediaGalleryItem, Button, Thumbnail,
    Separator
} = require("./types");
const axios = require("axios");


const doRequest = async (url, method, data) => {
    try {
        const response = axios({
            url,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${process.env.token}`,
            }
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

doRequest("https://discord.com/api/v10/channels/1173457060332060752/messages", "POST", {
    flags: 1 << 15,
    components: [
        new Container().addComponents(
            new TextDisplay().setContent("# Header"), 
            // You can add a separator between sections
            new Separator(), 
            // You can have multiple sections in a container
            new Section().addComponents(
                new TextDisplay().setContent("This is the first section"),
                new TextDisplay().setContent("You can use emojis like 💸👍❤"),
                new TextDisplay().setContent("But also markdown like **bold** or *italic*\nEven [links](https://google.com)\nThough, the max items for a Section is 3")
            ).setAccessory(
                // You can add an image as an accessory
                new Thumbnail().setMedia({ url: "https://cdn.discordapp.com/avatars/723553355753848832/19183e9b8b7ac05c62f8847e1a1260a5.png?size=512" })
            ),
            new Separator(), 
            // Maybe have a media gallery instead of a section?
            new MediaGallery().addItems(
                new MediaGalleryItem().setURL("https://cdn.discordapp.com/avatars/723553355753848832/19183e9b8b7ac05c62f8847e1a1260a5.png?size=512"),
                new MediaGalleryItem().setURL("https://cdn.discordapp.com/avatars/723553355753848832/19183e9b8b7ac05c62f8847e1a1260a5.png?size=512"),
                new MediaGalleryItem().setURL("https://cdn.discordapp.com/avatars/723553355753848832/19183e9b8b7ac05c62f8847e1a1260a5.png?size=512")
            ),
            new Separator(),
            new Section().addComponents(
                new TextDisplay().setContent("# This is another section"),
                new TextDisplay().setContent("You can have a button instead of an image as an accessory")
            ).setAccessory(
                new Button().setStyle(1).setLabel("Click me").setCustomId("button1")
            ), 
            new Separator(), 
            new TextDisplay().setContent("Woo, a footer!")
        ).setAccentColor(0xFF0000 /* You can also make it look like an embed by adding an accent color */)
        .setSpoiler(false /* You can also mark the containers as spoilers */)
        .build(),
    ]
}).then(data => {
    console.log("Data:", data);
}).catch(error => {
    console.error("Error:", error);
});
