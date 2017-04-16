export const colors = [
  { value: 0x001f3f, hash: "#001f3f", name: "NAVY", id: "A" },
  { value: 0x0074d9, hash: "#0074d9", name: "BLUE", id: "B" },
  { value: 0x7fdbff, hash: "#7fdbff", name: "AQUA", id: "C" },
  { value: 0x39cccc, hash: "#39cccc", name: "TEAL", id: "D" },
  { value: 0x3d9970, hash: "#3d9970", name: "OLIVE", id: "E" },
  { value: 0x2ecc40, hash: "#2ecc40", name: "GREEN", id: "F" },
  { value: 0x01ff70, hash: "#01FF70", name: "LIME", id: "G" },
  { value: 0xffdc00, hash: "#ffdc00", name: "YELLOW", id: "H" },
  { value: 0xff851b, hash: "#ff851b", name: "ORANGE", id: "I" },
  { value: 0xff4136, hash: "#ff4136", name: "RED", id: "J" },
  { value: 0x85144b, hash: "#85144b", name: "FUCHSIA", id: "K" },
  { value: 0xb10dc9, hash: "#b10dc9", name: "PURPLE", id: "L" },
  { value: 0x111111, hash: "#111111", name: "BLACK", id: "M" },
  { value: 0xaaaaaa, hash: "#aaaaaa", name: "GRAY", id: "N" },
  { value: 0xdddddd, hash: "#dddddd", name: "SILVER", id: "O" },
  { value: 0xf2f2f2, hash: "#f2f2f2", name: "UNCLAIMED", id: "P" }
];

export function getColorById(id) {
  return colors.find(color => {
    return color.id === id;
  });
}
