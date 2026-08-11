import { motion, useScroll, useTransform } from "framer-motion";

export default function RightSide3D() {
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress to a massive scroll wheel movement (from 0px to 140px down)
  const wheelY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  
  // The entire mouse moving down as you scroll
  const mouseParallaxY = useTransform(scrollYProgress, [0, 1], [0, 800]);
  
  return (
    <div className="hidden xl:flex mt-14 h-[600px] w-full xl:mt-0 items-center justify-center relative perspective-[1200px]">
      
      {/* Intense Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[500px] w-[500px] rounded-full bg-primary/30 blur-[100px]"
      />

      {/* Parallax Wrapper that moves down on scroll */}
      <motion.div style={{ y: mouseParallaxY }} className="relative z-20">
        
        {/* Giant Floating Glassmorphic Mouse */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotateX: [10, 5, 10], rotateY: [-15, -5, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-[400px] w-[240px] flex-col items-center overflow-hidden rounded-[120px] border-[4px] border-white/20 bg-gradient-to-b from-white/10 to-black/60 backdrop-blur-3xl shadow-[0_30px_80px_rgba(123,130,254,0.3)]"
        >
          {/* Mouse Left/Right Click Separator */}
          <div className="absolute top-0 h-[150px] w-[3px] bg-gradient-to-b from-white/30 to-transparent" />

          {/* The Massive Scroll Wheel Track */}
          <div className="mt-[40px] flex h-[200px] w-[20px] justify-center rounded-full bg-black/60 shadow-[inset_0_5px_15px_rgba(0,0,0,1)] border border-white/5">
            {/* The Scroll Wheel itself */}
            <motion.div
              style={{ y: wheelY }}
              className="h-[60px] w-[14px] mt-[2px] rounded-full bg-gradient-to-b from-[#7B82FE] via-[#e879f9] to-[#7B82FE] shadow-[0_0_20px_rgba(232,121,249,0.8)]"
            />
          </div>
          
          {/* Base Glow Effects inside the mouse */}
          <div className="absolute bottom-[-20px] h-[150px] w-[150px] rounded-full bg-primary/40 blur-[60px]" />
          
          {/* Subtle reflection on the glass */}
          <div className="absolute -left-20 -top-20 h-[300px] w-[100px] rotate-45 bg-white/5 blur-[20px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
