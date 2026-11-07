// Verified Unsplash photo IDs (each loaded and visually checked).
export const U = {
  heroCranes: '1591955506264-3f5a6834570a',
  cranesBirds: '1429497419816-9ca5cfb4571a',
  siteAerial: '1541888946425-d81bb19240f5',
  frame: '1508450859948-4e04fabaa4ea',
  cranesDusk: '1485083269755-a7b559a4fe5e',
  siteCity: '1599995903128-531fc7fb694b',
  nightBuild: '1536895058696-a69b1c7ba34f',
  towers: '1565008447742-97f6f38c985c',
  modernA: '1515263487990-61b07816b324',
  redCurve: '1486718448742-163732cd1544',
  whiteFacade: '1479839672679-a46483c0e7c8',
  glassUp: '1463096351051-3cf0a64d4079',
  brickModern: '1448630360428-65456885c650',
  villaPool: '1580587771525-78b9dba3b914',
  villaPool2: '1613490493576-7fde63acd811',
  villaPalms: '1613977257365-aaae5a9817ff',
  villaLawn: '1505843513577-22bb7d21e455',
  livingA: '1618221195710-dd6b41faaea6',
  livingArch: '1600210491892-03d54c0aaf87',
  livingOrange: '1618220179428-22790b461013',
  lobbyA: '1621293954908-907159247fc8',
  lobbyChandelier: '1625244724120-1fd1d34d00f6',
  hallway: '1495365200479-c4ed1d35e1aa',
  roller: '1595734939818-f4e0d44957df',
  road: '1590166068416-fd25b2442774',
  skylineNight: '1663900108404-a05e8bf82cda',
  riyadhAerial: '1586724237569-f3d0c1dee8c6',
  kingdom: '1694018359679-49465b4c0d61',
  drawing: '1503387762-592deb58ef4e',
  blueprint: '1542621334-a254cf47733d',
  officeGlass: '1497366811353-6870744d04b2',
  workers: '1504307651254-35680f356dfd',
  hardHat: '1587582423116-ec07293f0395',
} as const;

export type ImgKey = keyof typeof U;
export const WIDTHS = [480, 800, 1200, 1800];
export const imgUrl = (key: ImgKey, w: number, q = 72) =>
  `https://images.unsplash.com/photo-${U[key]}?auto=format&fit=crop&w=${w}&q=${q}`;
export const imgSrcset = (key: ImgKey) =>
  WIDTHS.map((w) => `${imgUrl(key, w)} ${w}w`).join(', ');
