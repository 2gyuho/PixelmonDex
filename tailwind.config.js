/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gray-400", "bg-orange-500", "bg-blue-500", "bg-green-500", "bg-yellow-400",
    "bg-cyan-300", "bg-red-700", "bg-purple-600", "bg-yellow-700", "bg-sky-400",
    "bg-pink-500", "bg-lime-600", "bg-stone-500", "bg-indigo-700", "bg-violet-700",
    "bg-gray-800", "bg-slate-500", "bg-pink-300",
    "bg-gray-200", "bg-green-100", "bg-blue-100", "bg-purple-100", "bg-yellow-100",
    "text-white", "text-black", "text-gray-800", "text-gray-700",
    "text-green-800", "text-blue-800", "text-purple-800", "text-yellow-800",
    "border-gray-400", "border-green-500", "border-blue-500", "border-purple-500", "border-yellow-500"
  ],
  theme: {
    extend: {
      colors: {
        pokered: "#e3350d",
        pokeyellow: "#ffcb05",
        pokegray: "#1a1a2e",
      },
    },
  },
  plugins: [],
};
