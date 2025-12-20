import { ChatGptInput, CircleRing } from "@/components/animations";
import ButtonInteraction from "@/components/button/ButtonInteraction";
import EnterAnimation from "@/components/enteranimation/EnterAnimation";
import ProgressBarContainer from "@/components/machinecodinground/progressbar/ProgressBarContainer";
import StepperContainer from "@/components/machinecodinground/stepper/StepperContainer";

interface WorkProps {
  params: Promise<{ title: string; id: number }>;
}

const page = async ({ params }: WorkProps) => {
  const { title, id } = await params;

  if (Number(id) === 101) {
    return (
      <main className="max-w-[1000px] mx-auto my-12">
        <StepperContainer />
      </main>
    );
  }

  if (Number(id) === 102) {
    return (
      <main className="max-w-[1000px]  mx-auto my-12 flex justify-center items-center h-screen">
        <div className="min-w-[320px] w-full max-w-[460px]">
          <ProgressBarContainer />
        </div>
      </main>
    );
  }

  if (Number(id) === 103) {
    return (
      <main className="mx-auto my-12">
        <CircleRing />
        <ChatGptInput />
      </main>
    );
  }

  if (Number(id) === 104) {
    return (
      <main className="mx-auto my-12">
        <EnterAnimation/>
      </main>
    );
  }

  return null;
};

export default page;
