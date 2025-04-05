declare module 'colorthief' {
  const ColorThief: {
    new(): {
      getColor: (sourceImage: Image, quality?: number) => [number, number, number]
    }
  }
  export default ColorThief
}
