'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .regex(/^\+?\d{7,15}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (data: ContactFormData) => {
    console.log('Submitted:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <motion.div
      id='contact-me'
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-[1000px] mx-auto my-10 px-4 outfit-500"
    >
      <div className="text-white rounded-3xl md:p-10 shadow-xl">
        <div className="text-center mb-12 outfit-500">
          <h2 className="text-4xl font-bold mb-2 text-white">Contact Me</h2>
          <p className="text-white/60 text-lg">
            Let’s connect — whether it’s a project, collaboration, or just to say hi
          </p>
        </div>


        <AnimatePresence>
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-6 text-white text-center py-3 px-4 rounded-lg font-semibold"
            >
              🎉 Thank you! Your message has been sent.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                placeholder="Azad Tom"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white outfit-400"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="kumarazad2917@gmail.com"
                className="outfit-400 w-full px-4 py-3 bg-white border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+91 9310855758"
              className="outfit-400 w-full px-4 py-3 bg-white border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Message
            </label>
            <textarea
              {...register('message')}
              placeholder="Type your message here..."
              className="outfit-400 w-full px-4 py-3 h-32 bg-white border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black uppercase font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </motion.button>
          </div>

        </form>
      </div>
    </motion.div>
  )
}

export default ContactUs
