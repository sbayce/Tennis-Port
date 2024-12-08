/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'

const SheetContentFade = ({ children, key, ...props }: any) => {
  return (
    <motion.div
        key={key}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, transition: {delay: 0.4} }} 
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        {...props}
    >
      {children}
    </motion.div>
  )
}

export default SheetContentFade
