import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Update 'social media post' to 'social_media'
function removeSpaces(word: string) {
    return word.replace(/\s+/g, '_');
}

async function main() {
    while (true) {
        const word = await new Promise<string>((resolve) => {
            rl.question('Enter a word to update (or "exit" to quit): ', resolve);
        });

        if (word.toLowerCase() === 'exit') {
            break;
        }

        const updatedWord = removeSpaces(word);

        const { error: updateError } = await supabase
            .from('exercise')
            .update({ task: updatedWord })
            .eq("task", word);

        if (updateError) {
            console.error('Error updating word:', updateError);
        } else {
            console.log(`Successfully updated '${word}' to '${updatedWord}'`);
        }
    }

    rl.close();
}

main().catch(console.error);