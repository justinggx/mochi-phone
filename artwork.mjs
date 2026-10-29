// Only bundled artwork is converted; user avatars and uploads never enter this list.
const PNG_ARTWORK = new Set([
  "gomoku-art-20261018/mochi-phone-gomoku-candy-icon-20261018.png",
  "gomoku-art-20261018/mochi-phone-gomoku-icon-20261018.png",
  "gomoku-art-20261018/mochi-phone-gomoku-misty-icon-20261018.png",
  "gomoku-art-20261018/mochi-phone-gomoku-star-icon-20261018.png",
  "icons-20261013/mochi-phone-candy-games-20261013.png",
  "icons-20261013/mochi-phone-candy-home-20261013.png",
  "icons-20261013/mochi-phone-misty-games-20261013.png",
  "icons-20261013/mochi-phone-misty-home-20261013.png",
  "icons-20261013/mochi-phone-star-games-20261013.png",
  "icons-20261013/mochi-phone-star-home-20261013.png",
  "shop-art-20261018/mochi-phone-shop-candy-20261018.png",
  "shop-art-20261018/mochi-phone-shop-hero-20261018.png",
  "shop-art-20261018/mochi-phone-shop-misty-20261018.png",
  "shop-art-20261018/mochi-phone-shop-star-20261018.png",
  "sudoku-art-20261020/mochi-phone-sudoku-candy-icon-20261020.png",
  "sudoku-art-20261020/mochi-phone-sudoku-misty-icon-20261020.png",
  "sudoku-art-20261020/mochi-phone-sudoku-star-icon-20261020.png",
  "theatre-art-20261023/mochi-phone-theatre-candy-icon-20261023-v118.png",
  "theatre-art-20261023/mochi-phone-theatre-candy-icon-20261023-v121.png",
  "theatre-art-20261023/mochi-phone-theatre-misty-icon-20261023-v118.png",
  "theatre-art-20261023/mochi-phone-theatre-misty-icon-20261023-v121.png",
  "theatre-art-20261023/mochi-phone-theatre-star-icon-20261023-v118.png",
  "theatre-art-20261023/mochi-phone-theatre-star-icon-20261023-v121.png"
]);
export function productArtworkSources(path, baseURI) {
  if (!PNG_ARTWORK.has(path)) return [];
  const local = new URL('scripts/extensions/third-party/mochi-phone/'+path,baseURI).href;
  return [local.slice(0,-4)+'.webp','https://preview.taliatang1.xyz/assets/'+path.split('/').pop(),local];
}
export function loadArtwork(image, sources, {valid=()=>true,loaded=()=>{},failed=()=>{}}={}) {
  const urls=[...new Set(sources.filter(Boolean))]; let index=0;
  const clear=()=>{image.onload=null;image.onerror=null;};
  image.onload=()=>{clear();if(valid())loaded();};
  image.onerror=()=>{
    if(!valid()){clear();return;}
    if(++index<urls.length)image.src=urls[index];else{clear();failed();}
  };
  if(urls.length)image.src=urls[0];else{clear();failed();}
}
