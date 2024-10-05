import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function display() {
    const { data: exercises, error } = await supabaseAdmin
        .from('exercise')
        .select('niche, task')
        .order('niche', { ascending: true });

    if (error) {
        console.error('Error fetching exercises:', error);
        return null;
    }

    const nicheTaskMap = exercises.reduce<Record<string, Set<unknown>>>((acc, exercise) => {
        if (!acc[exercise.niche]) {
            acc[exercise.niche] = new Set();
        }
        acc[exercise.niche].add(exercise.task);
        return acc;
    }, {});

    const result = Object.entries(nicheTaskMap).map(([niche, tasks]) => ({
        niche,
        tasks: Array.from(tasks)
    }));

    return result;
}

display().then(console.log);
