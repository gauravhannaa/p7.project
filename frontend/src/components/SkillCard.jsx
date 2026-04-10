import { motion } from "framer-motion";

const SkillCard = ({ name, percentage }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border border-neon/20 rounded p-3 bg-black/40"
    >
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="text-neon">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-neon"
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;