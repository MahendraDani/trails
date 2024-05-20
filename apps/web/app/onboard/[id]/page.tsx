import { OnboardForm } from "@repo/ui/components/forms/onboard.form";

interface IOnboardPageProps {
  params: {
    id: string;
  };
}

export default async function Onboarduser({ params }: IOnboardPageProps) {
  return (
    <div className="w-full h-[49.5rem] bg-gradient-to-br from-blue-100 via-yellow-50 to-green-100 flex justify-center items-center">
      <OnboardForm id="123" />
    </div>
  );
}
