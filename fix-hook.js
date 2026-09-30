const fs = require('fs');
const path = '/Users/pradyumnap/Desktop/pthree-tv-attract/src/hooks/useAttractTimeline.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
`export const useAttractTimeline = () => {
  const masterTimeline = useRef(null);

  useEffect(() => {
    // Create master timeline
    const tl = gsap.timeline({
      repeat: -1, // Loop infinitely
      paused: false,
    });
    
    masterTimeline.current = tl;

    return () => {`,
`export const useAttractTimeline = () => {
  const masterTimeline = useRef(null);

  if (!masterTimeline.current) {
    masterTimeline.current = gsap.timeline({
      repeat: -1, // Loop infinitely
      paused: false,
    });
  }

  useEffect(() => {
    return () => {`
);
fs.writeFileSync(path, content);
