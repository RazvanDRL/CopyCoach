export type Task = "blog_post" | "captions" | "email_marketing" | "flyer" | "social_media" | "story_scripts" | "product_description" | "story_scripts";

export const niches = [
    {
        value: "clinics",
        label: "Clinics",
        tasks: ["social_media", "email_marketing", "flyer"] as Task[]
    },
    {
        value: "e-commerce",
        label: "E-commerce",
        tasks: ["blog_post", "social_media", "email_marketing", "product_description"] as Task[]
    },
    {
        value: "influencers",
        label: "Influencers",
        tasks: ["blog_posts", "captions", "scripts", "story_scripts", "email_marketing", "social_media"] as Task[]
    },
    {
        value: "local_shops",
        label: "Local Business",
        tasks: ["email_marketing", "flyer", "social_media"] as Task[]
    },
    {
        value: "restaurants",
        label: "Restaurants",
        tasks: ["email_marketing", "social_media", "flyer"] as Task[]
    },
];

export const tasks: { value: Task; label: string }[] = [
    {
        value: "blog_post",
        label: "Blog Post",
    },
    {
        value: "captions",
        label: "Captions",
    },
    {
        value: "email_marketing",
        label: "Email Marketing",
    },
    {
        value: "flyer",
        label: "Flyer",
    },
    {
        value: "social_media",
        label: "Social Media",
    },
    {
        value: "story_scripts",
        label: "Story Scripts",
    },
]

export const levels = [
    {
        value: 0,
        xp: 0,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 1,
        xp: 10,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 2,
        xp: 20,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 3,
        xp: 30,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 4,
        xp: 40,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 5,
        xp: 50,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 6,
        xp: 70,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 7,
        xp: 90,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 8,
        xp: 110,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 9,
        xp: 130,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 10,
        xp: 150,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 11,
        xp: 180,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 12,
        xp: 210,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 13,
        xp: 240,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 14,
        xp: 270,
        background_color: "#000000",
        text_color: "#FFFFFF",
    },
    {
        value: 15,
        xp: 300,
        background_color: "#000000",
        text_color: "#FFFFFF",
    }
]