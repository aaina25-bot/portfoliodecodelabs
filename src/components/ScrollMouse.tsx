import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMouse() {
  const { scrollYProgress } = useScroll();
  
  // Map the scroll progress (0 to 1) to a pixel translation (0 to 16px) for the mouse wheel
  const yBase = useTransform(scrollYProgress, [0, 1], [0, 16]);

  return (
    <div className="fixed bottom-[5%] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center space-y-2 opacity-70 transition-opacity hover:opacity-100 xl:left-auto xl:right-[5%] xl:translate-x-0">
      <div className="relative flex h-10 w-6 justify-center rounded-[12px] border-2 border-white/40 p-1 backdrop-blur-md">
        <motion.div
          style={{ y: yBase }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-1 rounded-full bg-primary"
        />
      </div>
    </div>
  );
}
