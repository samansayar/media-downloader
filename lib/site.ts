const baseUrl = process.env.NODE_ENV === 'production' ? "https://dl.samansayyar.com" : "http://localhost:3000";
const host = process.env.NODE_ENV === 'production' ? "dl.samansayyar.com" : "localhost:3000";

export const setting = {
    logo: "Media-Downloader",
    name: "Saman Sayyar",
    Delay: 1,
    url: baseUrl,
    host,
    photo: "/samansayyar.jpeg",
    links: [
        {
            name: "github",
            url: "https://github.com/samansayar",
        },
        {
            name: "mail",
            url: "mailto:samansayyar.dev@gmail.com",
        },
    ],
}
