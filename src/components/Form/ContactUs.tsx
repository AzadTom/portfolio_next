'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormBackground from './FormBackground'
import FormTitle from './FormTitle'
import FormContainer from './FormContainer'
import InputLabel, { inputlabelStyle, inputStyle, TextAreaLabel, textareaStyle } from './InputLabel'

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
    <FormBackground bgImage='./contact_us_image.png' className='w-full h-screen flex justify-center items-center'>
      <FormContainer className="w-full sm:max-w-[500px] mx-4 sm:mx-auto my-10 p-4 outfit-500 scroll-m-8 bg-black rounded-2xl">
        <FormTitle
          className='text-black rounded-3xl mt-8'
          title='Get in Touch'
          titleClassName='text-4xl mb-2 text-white outfit-500'
          subtitle='You can reach us anytime'
          subtitleClassName='text-white/60 text-lg outfit-400'
        />
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4">
            {/* Name */}
            <InputLabel
              inputClassName={inputStyle}
              placeholder='Enter your name'
              labelId='name'
              register={register('name')}
              isError={errors.name ? true : false}
              errorMessage={errors.name?.message}
            />
            {/* Email */}
            <InputLabel
              inputClassName={inputStyle}
              placeholder='Enter your email'
              labelId='email'
              register={register('email')}
              isError={errors.email ? true : false}
              errorMessage={errors.email?.message}
            />
          </div>
          {/* Phone */}
          <InputLabel
            inputClassName={inputStyle}
            placeholder='Enter phone number'
            labelId='phone'
            type='tel'
            register={register('phone')}
            isError={errors.phone ? true : false}
            errorMessage={errors.phone?.message}
          />

          {/* Message */}
          <TextAreaLabel
            labelId='messsage'
            placeholder="Tell us what can we help you..."
            inputClassName={textareaStyle}
            register={register('message')}
            isError={errors.message ? true : false}
            errorMessage={errors.message?.message}
          />
          {/* Submit Button */}
          <div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black cursor-pointer uppercase font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </motion.button>
          </div>
        </form>
      </FormContainer>
    </FormBackground>
  )
}

export default ContactUs
