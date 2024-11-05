import { motion } from 'framer-motion'

const FadeInWrapper = ({ children, ...props }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWrapper
