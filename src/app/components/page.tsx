import AutoCompleteContainer from '@/components/machinecodinground/autoComplete/AutoCompleteContainer'
import CinemaHallContainer from '@/components/machinecodinground/cinemehallComponent/CinemaHallContainer'
import CountDown from '@/components/machinecodinground/countdown/CountDown'
import KanBan from '@/components/machinecodinground/kanban/KanBan'
import ProgressBarContainer from '@/components/machinecodinground/progressbar/ProgressBarContainer'
import QuizContainer from '@/components/machinecodinground/quizComponent/QuizContainer'
import StepperContainer from '@/components/machinecodinground/stepper/StepperContainer'
import ToastExample from '@/components/Toast/ToastExample'
import React from 'react'

const page = () => {
  return (

    <>
      <div className='max-w-[1000px] mx-auto p-4 sm:my-8'>
        <AutoCompleteContainer />
        <StepperContainer />
        <QuizContainer />
        <ProgressBarContainer />
        <CinemaHallContainer />
        <CountDown />
        <KanBan />
       
      </div>
     <ToastExample/>
    </>

  )
}

export default page