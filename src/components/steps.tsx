'use client';
import React, { useState } from 'react';

const steps = [
  {
    title: 'Create Organization',
    desc: 'Please give details about your organization.',
  },
  {
    title: 'Buy Plan',
    desc: 'Please choose and buy your plan.',
  },
  {
    title: 'Provide Branding Inputs',
    desc: 'Please provide your branding information.',
  },
  {
    title: 'Choose frontend template',
    desc: 'Choose the marketing pages template that best fits your organization.',
  },
  {
    title: 'Configure Domain',
    desc: 'Configure your whitelabel domain.',
  },
];

export function Steps({ step }: { step?: number } = {}) {
  const [currentStep, setCurrentStep] = useState(step ?? 0);

  function getState(i: number) {
    if (i < currentStep) return 'complete';
    if (i === currentStep) return 'current';
    return 'upcoming';
  }

  return (
    <div className="py-8 max-w-md">
      <div className="relative flex">
        {/* Vertical timeline line (absolute, spans all steps) */}
        <div
          className="absolute left-[32px] top-0 bottom-0 w-px bg-transparent z-0"
          style={{ minHeight: '100%' }}
        />
        <ol className="w-full flex flex-col gap-0 relative z-10">
          {steps.map((step, i) => {
            const state = getState(i);
            return (
              <li key={i} className="flex relative min-h-[60px]">
                {/* Timeline dot */}
                <div
                  className="flex flex-col items-center z-10"
                  style={{ width: 64 }}
                >
                  <div className="relative">
                    <span
                      className={`
                        flex items-center justify-center w-6 h-6 rounded-full border-4
                        ${
                          state === 'complete'
                            ? 'bg-background border-foreground text-foreground'
                            : state === 'current'
                            ? 'bg-foreground/40 border-foreground text-white'
                            : 'bg-foreground/40 border-foreground text-foreground'
                        }
                      `}
                    >
                      {state === 'complete' ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : state === 'current' ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="#fff"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle cx="12" cy="12" r="5" fill="#fff" />
                        </svg>
                      ) : (
                        <span className="w-6 h-6" />
                      )}
                    </span>
                  </div>
                  {/* Vertical connecting line for all except last */}
                  {i !== steps.length - 1 && (
                    <div
                      className={`w-1 flex-1 ${
                        state === 'complete' || state === 'current'
                          ? 'bg-foreground/20'
                          : 'bg-foreground/20'
                      }`}
                      style={{ minHeight: '18px', marginTop: '-2px' }}
                    />
                  )}
                </div>
                {/* Step content */}
                <div className="flex-1 pb-4">
                  <div
                    className={`font-semibold text-base leading-tight ${
                      state === 'complete'
                        ? 'text-foreground'
                        : state === 'current'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-sm leading-snug ${
                      state === 'complete' || state === 'current'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
