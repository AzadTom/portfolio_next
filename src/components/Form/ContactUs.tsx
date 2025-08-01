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
    try {

      await fetch("https://formspree.io/f/xkgzbbyz", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)

    }
  }

  return (
    <motion.div
      id='contact-me'
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="max-w-[1000px] mx-auto my-10 px-4 outfit-500 scroll-m-8"
    >
      <div className="text-white rounded-3xl md:p-10 shadow-xl">
        <div className="text-center mb-12 outfit-500">
          <h2 className="text-4xl font-bold mb-2 text-white">Contact Me</h2>
          <p className="text-white/60 text-lg outfit-300">
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
                Name
              </label>
              <input
                {...register('name')}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 shadow-md   text-white rounded-lg focus:outline-none  outfit-400"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Email 
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="outfit-400 w-full px-4 py-3 bg-white/5 border border-white/10 shadow-md text-white rounded-lg focus:outline-none "
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Phone Number 
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="Enter phone number"
              className="outfit-400 w-full px-4 py-3 bg-white/5 border border-white/10 shadow-md text-white rounded-lg focus:outline-none "
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
              className="outfit-400 w-full px-4 py-3 h-32 bg-white/5 border border-white/10 shadow-md text-white rounded-lg focus:outline-none  resize-none"
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
