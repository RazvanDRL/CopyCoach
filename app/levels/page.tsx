"use client";

import React from 'react';
import { levels } from '@/constants';
import Level from '@/components/level';

export default function LevelsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Levels</h1>
            <div className="grid grid-cols-3 gap-6">
                {levels.map((level) => (
                    <Level key={level.value} level={level.value} showTooltip={true} total_xp={200} />
                ))}
            </div>
        </div>
    );
}
