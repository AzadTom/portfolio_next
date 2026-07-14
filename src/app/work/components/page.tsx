import AutoCompleteContainer from '@/components/machinecodinground/autoComplete/AutoCompleteContainer'
import CinemaHallContainer from '@/components/machinecodinground/cinemehallComponent/CinemaHallContainer'
import CountDown from '@/components/machinecodinground/countdown/CountDown'
import KanBan from '@/components/machinecodinground/kanban/KanBan'
import ProgressBarContainer from '@/components/machinecodinground/progressbar/ProgressBarContainer'
import QuizContainer from '@/components/machinecodinground/quizComponent/QuizContainer'
import StepperContainer from '@/components/machinecodinground/stepper/StepperContainer'
import TestToast from '@/components/toast/TestToast';


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
     <TestToast/>
    </>

  )
}

export default page