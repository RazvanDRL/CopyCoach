export type Task = "blog_post" | "captions" | "email_marketing" | "flyer" | "social_media" | "story_scripts";

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
        tasks: ["story_scrips", "blog_posts", "captions", "scripts", "story_scripts", "email_marketing", "social_media"] as Task[]
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