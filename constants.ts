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
    },
    {
        value: 1,
        xp: 10,
    },
    {
        value: 2,
        xp: 20,
    },
    {
        value: 3,
        xp: 30,
    },
    {
        value: 4,
        xp: 40,
    },
    {
        value: 5,
        xp: 50,
    },
    {
        value: 6,
        xp: 70,
    },
    {
        value: 7,
        xp: 90,
    },
    {
        value: 8,
        xp: 110,
    },
    {
        value: 9,
        xp: 130,
    },
    {
        value: 10,
        xp: 150,
    },
    {
        value: 11,
        xp: 180,
    },
    {
        value: 12,
        xp: 210,
    },
    {
        value: 13,
        xp: 240,
    },
    {
        value: 14,
        xp: 270,
    },
    {
        value: 15,
        xp: 300,
    },
    {
        value: 16,
        xp: 340,
    },
    {
        value: 17,
        xp: 380,
    },
    {
        value: 18,
        xp: 420,
    },
    {
        value: 19,
        xp: 460,
    },
    {
        value: 20,
        xp: 500,
    }
]