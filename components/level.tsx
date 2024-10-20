import React from 'react';
import { levels } from '@/constants';
import localFont from 'next/font/local';

const BricolageGrotesque = localFont({
    src: "../app/fonts/BricolageGrotesque.ttf",
    weight: "100 900",
    variable: '--font-bricolage-grotesque',
})

interface LevelProps {
    level: number;
    total_xp: number;
    showTooltip?: boolean;
}

const Level: React.FC<LevelProps> = ({ level, total_xp, showTooltip = true }) => {
    const getLevelInfo = (level: number) => {
        return levels.find(l => l.value === level) || levels[0];
    }

    const getXpForNextLevel = (level: number) => {
        const nextLevel = levels.find(l => l.value === level + 1);
        return nextLevel ? nextLevel.xp : levels[levels.length - 1].xp;
    }

    const levelInfo = getLevelInfo(level);
    const xpForNextLevel = getXpForNextLevel(level);
    const progressPercentage = Math.min(100, Math.round((total_xp / xpForNextLevel) * 100));

    return (
        <div className="flex items-center">
            <div className="flex flex-col relative group text-right">
                <div className="flex items-center justify-between">
                    <div className={`text-[10px] ${BricolageGrotesque.className} text-gray-600 mb-1`}>
                        {total_xp}/{xpForNextLevel}
                    </div>
                    <div className={`text-[10px] ${BricolageGrotesque.className} text-gray-600 text-right mb-1`}>
                        level {level}
                    </div>
                </div>
                <div className="relative w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#007FFF]/90"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Level;
