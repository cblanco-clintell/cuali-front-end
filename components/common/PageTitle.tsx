import React from 'react';

interface PageTitleProps {
    title: string;
    description?: string;
}

const PageTitle: React.FC<PageTitleProps> = (
    { title, description }: PageTitleProps
) => {
  return (
    <main className="flex flex-col justify-center py-4">
      <section className="flex flex-col justify-between px-8 w-full min-h-[62px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-between w-full min-h-[62px] max-md:max-w-full">
          <div className="flex flex-wrap justify-between items-center w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
              <h1 className="text-3xl font-semibold leading-none text-gray-900 max-md:max-w-full">
                {title}
              </h1>
              <p className="mt-1 text-sm leading-none text-slate-600 max-md:max-w-full">
                {description}
              </p>
            </div>
            <button className="flex items-start self-stretch my-auto text-sm font-semibold text-white rounded-lg overflow-hidden gap-2 px-3.5 py-2 bg-violet-400 border border-violet-400 border-solid shadow-sm">
              + Add new Study
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageTitle;