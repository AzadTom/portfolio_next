import AutoCompleteContainer from '@/components/machinecodinground/autoComplete/AutoCompleteContainer'
import CinemaHallContainer from '@/components/machinecodinground/cinemehallComponent/CinemaHallContainer'
import CountDown from '@/components/machinecodinground/countdown/CountDown'
import KanBan from '@/components/machinecodinground/kanban/KanBan'
import ProgressBarContainer from '@/components/machinecodinground/progressbar/ProgressBarContainer'
import QuizContainer from '@/components/machinecodinground/quizComponent/QuizContainer'
import StepperContainer from '@/components/machinecodinground/stepper/StepperContainer'
import React from 'react'

const page = () => {
  return (

    <>
      <div className='max-w-[1000px] p-4 sm:my-8  mx-auto grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2'>
        <AutoCompleteContainer />
        <StepperContainer />
        <QuizContainer />
        <ProgressBarContainer />
        <CinemaHallContainer />
        <CountDown />
        <KanBan />
      </div>

    </>

  )
}

export default page