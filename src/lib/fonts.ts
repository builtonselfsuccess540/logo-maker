export const fonts = [
  { name: 'Inter', value: 'Inter, sans-serif', category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif', category: 'sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif', category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif', category: 'sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif', category: 'sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif', category: 'sans-serif' },
  { name: 'Oswald', value: 'Oswald, sans-serif', category: 'sans-serif' },
  { name: 'Raleway', value: 'Raleway, sans-serif', category: 'sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif', category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather, serif', category: 'serif' },
  { name: 'Lora', value: 'Lora, serif', category: 'serif' },
  { name: 'Crimson Text', value: '"Crimson Text", serif', category: 'serif' },
  { name: 'Pacifico', value: 'Pacifico, cursive', category: 'display' },
  { name: 'Lobster', value: 'Lobster, cursive', category: 'display' },
  { name: 'Dancing Script', value: '"Dancing Script", cursive', category: 'display' },
  { name: 'Bebas Neue', value: '"Bebas Neue", sans-serif', category: 'display' },
  { name: 'Anton', value: 'Anton, sans-serif', category: 'display' },
  { name: 'Righteous', value: 'Righteous, cursive', category: 'display' },
  { name: 'Permanent Marker', value: '"Permanent Marker", cursive', category: 'display' },
  { name: 'Orbitron', value: 'Orbitron, sans-serif', category: 'display' },
  { name: 'Press Start 2P', value: '"Press Start 2P", cursive', category: 'display' },
  { name: 'Abril Fatface', value: '"Abril Fatface", cursive', category: 'display' },
  { name: 'Fredoka One', value: '"Fredoka One", cursive', category: 'display' },
  { name: 'Bungee', value: 'Bungee, cursive', category: 'display' },
]

export const fontCategories = ['all', 'sans-serif', 'serif', 'display'] as const

export function getGoogleFontsUrl(): string {
  const fontNames = fonts.map(f => f.name.replace(/ /g, '+')).join('|')
  return `https://fonts.googleapis.com/css2?family=${fontNames.replace(/\|/g, '&family=')}&display=swap`
}
