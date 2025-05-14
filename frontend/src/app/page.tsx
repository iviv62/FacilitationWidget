import Image from "next/image";

export default function Home() {
  return (
   
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-all hover:shadow-lg">
    <div className="md:flex">
      <div className="md:shrink-0">
        <div className="h-48 w-full bg-indigo-500 md:h-full md:w-48"></div>
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Tailwind Demo</div>
        <h2 className="mt-1 text-xl font-medium text-gray-900">Card Component Example</h2>
        <p className="mt-2 text-slate-500">This card demonstrates Tailwind's utility classes for styling, responsive design, and hover effects.</p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Click me
        </button>
      </div>
    </div>
  </div>
  );
}
