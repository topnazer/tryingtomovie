module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',  // Custom primary blue
        secondary: '#F97316',  // Custom secondary orange
        background: '#1F2937',  // Dark background color
        textMain: '#FFFFFF',  // White text
        textSecondary: '#9CA3AF',  // Light gray for secondary text
      },
      spacing: {
        '128': '32rem',  // Large spacing
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Custom font
      },
      fontSize: {
        '5xl': '3rem',  // Large font sizes for headers
        '6xl': '3.75rem',
      },
      borderRadius: {
        'xl': '1.25rem',  // Large rounded corners
        '2xl': '1.5rem',
      },
      boxShadow: {
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',  // Medium shadow for cards
        'lg': '0 10px 15px rgba(0, 0, 0, 0.15)',  // Larger shadow
      },
    },
  },
  plugins: [],
};
