export type Task = "email_marketing" | "social_media" | "flyer" | "blog_post" | "story_scripts" | "captions";

export const niches = [
    {
        value: "local_shops",
        label: "Local Business",
        tasks: ["email_marketing", "social_media", "flyer"] as Task[]
    },
    {
        value: "e-commerce",
        label: "E-commerce",
        tasks: ["email_marketing", "social_media", "blog_post"] as Task[]
    },
    {
        value: "influencers",
        label: "Influencers",
        tasks: ["social_media", "story_scripts", "captions"] as Task[]
    },
    {
        value: "clinics",
        label: "Clinics",
        tasks: ["email_marketing", "social_media", "flyer"] as Task[]
    },
    {
        value: "restaurants",
        label: "Restaurants",
        tasks: ["social_media", "flyer", "captions"] as Task[]
    },
];

export const tasks: { value: Task; label: string }[] = [
    {
        value: "email_marketing",
        label: "Email Marketing",
    },
    {
        value: "social_media",
        label: "Social Media",
    },
    {
        value: "flyer",
        label: "Flyer",
    },
    {
        value: "blog_post",
        label: "Blog Post",
    },
    {
        value: "story_scripts",
        label: "Story Scripts",
    },
    {
        value: "captions",
        label: "Captions",
    },
]