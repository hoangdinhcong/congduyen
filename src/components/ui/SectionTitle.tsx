import React from 'react';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-medium">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-600">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-primary mt-4 mx-auto" />
    </div>
  );
}
